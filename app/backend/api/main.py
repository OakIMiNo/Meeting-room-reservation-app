from typing import Union

# routersディレクトリ以下ファイルを増やしたら追加
from api.routers import rooms

# log設定
from api.utils.logger import setup_logger
logger = setup_logger(__name__)

from fastapi import FastAPI
app = FastAPI()

# routersディレクトリ以下ファイル作成で下記追加
app.include_router(rooms.router)



# 以下は初期サンプル 後々削除予定
@app.get("/")
def read_root():
    logger.debug("通過")
    return {"test": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}