# routersディレクトリ以下ファイルを増やしたら追加
from api.routers import rooms
from typing import Union

from fastapi import FastAPI


app = FastAPI()

# routersディレクトリ以下ファイルを増やしたら追加
app.include_router(rooms.router)



# 以下は初期サンプル 後々削除
@app.get("/")
def read_root():
    return {"hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}