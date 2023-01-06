import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple, Optional
from sqlalchemy import select
from sqlalchemy.engine import Result
# from ..db import get_db

import api.models.users as user_model
import api.models.rooms as room_model
import api.models.reservations as reservation_model
import api.schemas.reservations as reservation_schema


# 予約の新規登録_POST 　　※※user_idなどに不備があり登録できない場合もPKが消費される
async def create_reservation(
    db: AsyncSession, 
    reservation_create: reservation_schema.ReservationCreate
    ) -> reservation_model.Reservation:

    # print("print")
    # print(db) # <sqlalchemy.orm.session.AsyncSession object at 0x7f58a967f760>
    # print(reservation_model.Reservation.room_id) # reservation.room_id
    # print(get_db) # 予約済み <function get_db at 0x7f8171c81550>
    # print(reservation_create) # APIのrequestパラメータ room_id=1 user_id=1 date=datetime.date(2023, 1, 6) start_time=datetime.time(10, 0) end_time=datetime.time(10, 0)
    # print(reservation_create.room_id) # 1
    # print("print")

    reservation = reservation_model.Reservation(**reservation_create.dict())
    db.add(reservation)
    await db.commit()
    await db.refresh(reservation)
    return reservation

# dict=Pythonの辞書型 {key：value}
# dict インスタンスに対して先頭に ** をつけることで、 dict を キーワード引数として展開し、クラスのコンストラクタに対して dict のkey/valueを渡す。（id=1, title=task_body.title, done=task_body.done) と等価）
# 引数としてスキーマ reserve_create: reserve_schema.ReserveCreate を受け取る。
# これをDBモデルである reservation_model.Reservation に変換する
# commit: DBにコミットする
# refresh: DB上のデータを元にReservationインスタンス reservation を更新する（この場合、作成したレコードの id を取得する）
# return: 作成したDBモデルを返却する


# 登録済みの予約一覧_GET
async def get_reservations(
  db: AsyncSession
  ) -> List[Tuple[int, datetime.date, datetime.time, datetime.time, int, int ,str, str]]:
  result: Result = await (
    db.execute( # Result インスタンスはこの時点ではまだすべてのDBリクエストの結果を持たない
      select(
        reservation_model.Reservation.id,
        
        reservation_model.Reservation.date,
        reservation_model.Reservation.start_time,
        reservation_model.Reservation.end_time,

        room_model.Room.id.label("room_id"),
        user_model.User.id.label("user_id"),
        room_model.Room.name.label("room_name"),
        user_model.User.name.label("user_name"),
      )
      .outerjoin(user_model.User)
      .outerjoin(room_model.Room)
    )
  )
  return result.all() # .all()で初めてすべてのDBレコードを取得
  # list型 [10, "a", ...]
  # tuple型 (10,) 要素の変更不可


# 登録済みの予約（id指定）_GET
async def get_reservation(
  db: AsyncSession, 
  id: int
  ) -> Optional[reservation_model.Reservation]:
    result: Result = await db.execute(
        select(
          reservation_model.Reservation,
          # room_model.Room.id.label("room_id"),
          # user_model.User.id.label("user_id"),
          room_model.Room.name.label("room_name"),
          user_model.User.name.label("user_name"),
        )
        .filter(reservation_model.Reservation.id == id)
        .outerjoin(user_model.User) #nullになる。リレーションできていない？
        .outerjoin(room_model.Room) #nullになる。リレーションできていない？
        # .outerjoin(user_model.User.name, user_model.User.id == reservation_model.Reservation.user_id) #nullになる。リレーションできていない？
        # .outerjoin(room_model.Room.name, room_model.Room.id == reservation_model.Reservation.room_id) #nullになる。リレーションできていない？
    )
    reservation: Optional[Tuple[reservation_model.Reservation]] = result.first()
    return reservation[0] if reservation is not None else None  
    # 要素が一つであってもtupleで返却されるので１つ目の要素を取り出す


# 登録済み予約のcancel_DELETE
async def delete_reservation(
  db: AsyncSession, 
  original: reservation_model.Reservation
  ) -> None:
    await db.delete(original)
    await db.commit()
# original としてDBモデルを受け取る
