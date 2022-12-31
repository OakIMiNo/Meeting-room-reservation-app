from datetime import datetime, timedelta
from typing import Union

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()

# to get a string like this run:
# openssl rand -hex 32
# JWTトークンの署名?
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

# レスポンスのトークンエンドポイントで使用するPydanticモデル


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# 受け取ったパスワードが保存されているハッシュと一致するかどうかを検証する
# plain_passwordはハッシュ化されていないパスワードな気がする…


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 送られてきたpasswordをハッシュする...どこにつながってる？


def get_password_hash(password):
    return pwd_context.hash(password)

# dbから対象のusernameのレコードを取得する


def get_user(db, username: str):
    # dbとの接続
    if username in db:
        user_dict = db[username]
        # 対象userのuser情報が返ってくる
        print("user_dict",user_dict) 
        return UserInDB(**user_dict)

# dbから取得したuser情報を返す
def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    print("authenticate_user",user)
    return user

# 新しいアクセストークンを作成する
# dictとは何だ？Unionって何だ？


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    # jwt.encodeとは？公開鍵作成？
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# クライアントから送られてきたtokenを検証する
async def get_current_user(token: str = Depends(oauth2_scheme)):
    # falseだったらこれ返す
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # jwtのdecode 復元ぽいな
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# userテーブルのdisabledレコードがtrueなら


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# tokenurl＝tokenに来たログイン情報を認証してアクセストークンを発行してフロントに返却


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(
        fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# 自分の頁を見に来ている
@router.get("/users/me/", response_model=User)
# read_users_meって何？
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


# 自分のitemを見に来ている
@router.get("/users/me/items/")
# read_own_itemsって何？
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]
