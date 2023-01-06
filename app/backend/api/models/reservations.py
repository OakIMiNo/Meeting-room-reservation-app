from sqlalchemy import Column, Date, DateTime, Integer, String, ForeignKey, Time
from sqlalchemy.orm import relationship

from api.db import Base

class Reservation(Base):
    __tablename__="reservations"

    id = Column(Integer, primary_key=True, autoincrement=True)

    start_dateTime = Column(String(100))
    end_dateTime = Column(String(100))
    date = Column(Date)
    time = Column(Time)
    dateTime = Column(DateTime)

    room_id = Column(Integer, ForeignKey("rooms.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    room = relationship("Room", back_populates="reservations")
    user = relationship("User", back_populates="reservations")
# Column 第一引数にカラムの型、第２引数以降にカラムの設定。




# リレーションテストのため仮作成、後で削除する
# class Room(Base):
#     __tablename__="rooms"

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(100))
#     reservations = relationship("Reservation", back_populates="room")

# class User(Base):
#     __tablename__="users"

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(100))
#     reservations = relationship("Reservation", back_populates="user")
