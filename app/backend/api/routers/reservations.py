from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from api.db import get_db
# from api.main import logger

import api.cruds.reservations as reservations_crud
import api.schemas.reservations as reservations_schema

router = APIRouter()

@router.post("/reservations", response_model=reservations_schema.ReservationCreateResponse)
async def create_reservation(
  reservation_body: reservations_schema.ReservationCreate, 
  db: AsyncSession = Depends(get_db)
):
  # logger.debug("予約追加") # 機能していない、やり方違う？
  return await reservations_crud.create_reservation(db, reservation_body)
# ルータはdb.pyで定義したget_db() 関数を通してセッションを取得し、DBへアクセスする
# （db.pyで、ASYNC_DB_URLに定義したMySQLのdockerコンテナに対して接続するセッションが作成されている）

