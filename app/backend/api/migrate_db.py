from sqlalchemy import create_engine
from api.utils.setting import settings


from api.models.rooms import Base

from api.models.reservations import Base
from api.models.users import Base
from api.models.areas import Base


user_name = settings.ROOT_NAME
user_pass = settings.ROOT_PASS
db_name = settings.DB_NAME

# 12行目は削除予定
# DB_URL = "mysql+pymysql://root:rootpass@db:3306/mydb?charset=utf8"
DB_URL = f'mysql+pymysql://{user_name}:{user_pass}@db:3306/{db_name}?charset=utf8'

engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
