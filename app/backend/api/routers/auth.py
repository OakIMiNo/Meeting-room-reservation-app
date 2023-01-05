from api.db import get_db
from datetime import datetime, timedelta
from typing import Union, Optional,Tuple,List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel,Field
from fastapi import APIRouter, Depends

# crud
import api.models.users as users_model
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select,update
from sqlalchemy.engine import Result
router = APIRouter()

# to get a string like this run:
# openssl rand -hex 32
# settingに記載する
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
      orm_mode = True

class TokenData(BaseModel):
    username: Union[str, None] = None

    class Config:
      orm_mode = True
# emailとpasswordは必須
class User(BaseModel):
    id: int
    name: Union[str, None] = None
    email: str
    hashed_password: str 
    disabled:  bool
    admin: bool

    class Config:
      orm_mode = True

class UserInDB(User):
    hashed_password: str

    class Config:
      orm_mode = True

class UserCreate(BaseModel):
    name: str = Field(example="johndoe")
    email: str = Field(example="johndoe@example.com")
    #password: str = Field(example="password")
    password: str = Field(example="secret")
    # disabled: bool 
    # admin: bool 

    class Config:
      orm_mode = True


class UserPutDisabled(BaseModel):
    # name: str = Field(example="johndoe")
    # email: str = Field(example="johndoe@example.com")
    # password: str = Field(example="password")
    # password: str = Field(example="secret")
    disabled: bool
    # admin: bool
    class Config:
      orm_mode = True



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()



def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)



def get_password_hash(password):
    return pwd_context.hash(password)



async def get_user(email: str, db):
    print("通過", email)
    result: Result = await db.execute(
        select(users_model.User.id,
               users_model.User.name,
               users_model.User.email,
               users_model.User.hashed_password,
               users_model.User.disabled,
               users_model.User.admin,
               )
        .filter(
            users_model.User.email == email)
    )
    print("result",result)
    # resultのtupleをdictionaryに変換
    keys = ('id', 'name', 'email', 'hashed_password', 'disabled', 'admin')
    user = dict(zip(keys, result.first()))
    print("id",user['id'])
    return user

# dbから取得したuser情報を返す
async def authenticate_user(db, email: str, password: str):
    print("authenticate_user通過","username",email, "password",password)
    user = await get_user(email, db)
    print("userの中身", user['hashed_password'])
    if not user:
        return False
    if not verify_password(password, user['hashed_password']):
        return False
    print("validation_passed")
    return user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# クライアントから送られてきたtokenを検証する
async def get_current_user(token: str = Depends(oauth2_scheme),db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print("token",token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("payload",payload)
        email: str = payload.get("sub")
        print("useremail入ってほしい",email)
        if email is None:
            raise credentials_exception
        token_data = TokenData(username=email)
    except JWTError:
        print("JWTError")
        raise credentials_exception
    email = token_data.username
    # user = get_user(db, email=token_data.username)
    user = await get_user(email, db)
    if user is None:
        raise credentials_exception
    print("get_current_user", user)
    return user

# userテーブルのdisabledレコードがtrueなら
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    print("current_user",current_user)
    if current_user['disabled'] == True:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# ログイン情報を認証してアクセストークンを発行してフロントに返却
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    print("通過通過",form_data.username)
    # form_dataのkeyはusernameで固定
    email = form_data.username
    password = form_data.password
    user = await authenticate_user(
        db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    print("create_access_token前")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['email']}, expires_delta=access_token_expires
    )
    print("create_access_token後")
    print("tokenを返している",access_token)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/register")
# crud
async def create_user(
    user_body: UserCreate, db: AsyncSession = Depends(get_db)
    ) -> users_model.User:
    print("user_body",user_body)
    hashed_password = get_password_hash(user_body.password)
    print("hashed_password", hashed_password)
    create_data = {
        "name": user_body.name,
        "email": user_body.email,
        "hashed_password": hashed_password,
        "disabled": False,
    # 管理者はtrue
        "admin": False
    }
    print("create_data", create_data)
    user = users_model.User(**create_data)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

# crud
async def crud_update_user(
    user_update: UserPutDisabled,
    original: users_model.User,
    db: AsyncSession = Depends(get_db)
    ) -> users_model.User:
    
    print("crud_update_task",original['id'])

    db_user = await db.get(users_model.User, original['id'])
    test = user_update.dict(exclude_unset=True)
    for key, value in test.items():
        setattr(db_user, key, value)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

# front退会押下でdisabledをTrueに更新
@router.put("/users/me/")
async def update_user(
    user_body: UserPutDisabled, 
    current_user: User = Depends(get_current_active_user), 
    db: AsyncSession = Depends(get_db), 
    ):
    print("user_body.disabled", user_body.disabled)
    print("current_user", current_user)
    #crud update_user
    original = current_user
    return await crud_update_user(user_body, original, db)




