from sqlalchemy import create_engine

# 対象テーブルが変更されたらfrom変更して使いまわす？
from api.models.rooms import Base

# 下記はenvファイル作成したほうがよさそうだけど一旦ここに記載
DB_URL = "mysql+pymysql://root:rootpass@db:3306/mydb?charset=utf8"

engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
