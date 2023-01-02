from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base

class Reservation(Base):
    __tablename__="reservations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    room_id = Column(Integer)
    user_id = Column(Integer)
    start_dateTime = Column(String(100))
    end_dateTime = Column(String(100))

    # room_id = Column(Integer, ForeignKey("rooms.id"))
    # user_id = Column(Integer, ForeignKey("users.id"))

    # room = relationship("Room", back_populates="room")
    # user = relationship("User", back_populates="user")
