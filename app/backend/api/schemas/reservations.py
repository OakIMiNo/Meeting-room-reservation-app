from typing import Optional
from pydantic import BaseModel, Field # バリデーションチェック

# BaseModel はFastAPIのスキーマモデルであることを表す

# GETのresponse
# BaseModelクラスを継承
class Reservation(BaseModel):
  id: Optional[int] # idフィールドが存在しなくてもok/型ヒント=int
  room_id: Optional[int]
  user_id: Optional[int]
  start_dateTime: Optional[str]
  start_dateTime: Optional[str]


# POSTのrequest
class ReservationCreate(BaseModel):
  room_id: int # プロパティが存在する/値がNoneではない/int型
  user_id: int
  start_dateTime: str = Field("2023/1/1_10:00", example="2023/1/1_10:00")
  end_dateTime: str = Field("2023/1/1_12:00", example="2023/1/1_12:00")
  # Field(param1, example=param2) フィールドに関する付加情報を記述。
  # param1=フィールドのデフォルト値、example=フィールドの値の例、description=引数の説明


# POSTのresponse
# ReservationCreateを継承
class ReservationCreateResponse(ReservationCreate):
    id: int

    class Config:
        orm_mode = True # このレスポンススキーマ ReservationCreateResponse が、暗黙的にORMを受け取り、レスポンススキーマに変換する
