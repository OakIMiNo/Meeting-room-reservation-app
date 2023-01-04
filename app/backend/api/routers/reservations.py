from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException
from api.db import get_db
from typing import List
# from api.main import logger

import api.cruds.reservations as reservations_crud
import api.schemas.reservations as reservations_schema

router = APIRouter()

# 予約の新規登録 　　※※user_idなどに不備があり登録できない場合もPKが消費される
@router.post("/reservations", response_model=reservations_schema.ReservationCreateResponse)
async def create_reservation(
  reservation_body: reservations_schema.ReservationCreate, 
  db: AsyncSession = Depends(get_db)
):
  # logger.debug("予約追加") # 機能していない、やり方違う？
  return await reservations_crud.create_reservation(db, reservation_body)
# ルータはdb.pyで定義したget_db() 関数を通してセッションを取得し、DBへアクセスする
# （db.pyで、ASYNC_DB_URLに定義したMySQLのdockerコンテナに対して接続するセッションが作成されている）


# 登録済み予約一覧の取得
@router.get("/reservations", response_model=List[reservations_schema.Reservation])
async def list_reservations(db: AsyncSession = Depends(get_db)):
  return await reservations_crud.get_reservations(db)


# 登録済み予約（id指定）の取得
@router.get("/reservations/{id}", response_model=reservations_schema.Reservation)
async def get_reservation(
  id: int, 
  db: AsyncSession = Depends(get_db)
  ):
  reservation = await reservations_crud.get_reservation(db, id=id)
  if reservation is None:
      raise HTTPException(status_code=404, detail="予約がありません")
  return await reservations_crud.get_reservation(db, id=id)


# 登録済み予約（id指定）の削除　
@router.delete("/reservations/{id}", response_model=None)
async def delete_reservation(
  id: int, 
  db: AsyncSession = Depends(get_db)
  ):
  reservation = await reservations_crud.get_reservation(db, id=id)
  if reservation is None:
      raise HTTPException(status_code=404, detail="予約がありません")

  return await reservations_crud.delete_reservation(db, original=reservation)
  # raise で例外（エラーが発生したときに送出されるもの）を手動で発生させる
  # HTTPException は任意のHTTPステータスコードを引数に取ることができる Exception クラス
  # 今回は 404 Not Found を指定して raiseする
