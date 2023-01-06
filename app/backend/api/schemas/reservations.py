import datetime
from typing import Optional
from pydantic import BaseModel, Field # バリデーションチェック

# BaseModel はFastAPIのスキーマモデルであることを表す

# GETのresponse
# BaseModelクラスを継承
class Reservation(BaseModel):
  id: Optional[int] # idフィールドが存在しなくてもok/型ヒント=int
  date: Optional[datetime.date]
  start_time: Optional[datetime.time]
  end_time: Optional[datetime.time]

  room_id: Optional[int]
  user_id: Optional[int]
  room_name: Optional[str]
  user_name: Optional[str]

  class Config:
    orm_mode = True


# POSTのrequest
class ReservationCreate(BaseModel):
  room_id: int # プロパティが存在する/値がNoneではない/int型
  user_id: int
  date: Optional[datetime.date]
  start_time: Optional[datetime.time]
  end_time: Optional[datetime.time]

# POSTのresponse
# ReservationCreateを継承
class ReservationCreateResponse(ReservationCreate):
  id: int

  class Config:
      orm_mode = True # このレスポンススキーマ ReservationCreateResponse が、暗黙的にORMを受け取り、レスポンススキーマに変換する
