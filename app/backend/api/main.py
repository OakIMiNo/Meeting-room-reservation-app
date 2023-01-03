from typing import Union
from api.utils.setting import settings
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# routersディレクトリ以下ファイルを増やしたら追加
from api.routers import rooms
from api.routers import auth
from api.routers import reservations


# log設定
from api.utils.logger import setup_logger
logger = setup_logger(__name__)

app = FastAPI()

# 以下は一旦空で
#origins = [ ]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# routersディレクトリ以下ファイル作成で下記追加
app.include_router(rooms.router)
app.include_router(auth.router)
app.include_router(reservations.router)


# 以下は初期サンプル 後々削除予定
@app.get("/")
def read_root():
    logger.debug("通過")
    return {"test": "test"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}