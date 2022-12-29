from sqlalchemy import Column, Integer, String, ForeignKey

#from sqlalchemy.orm import relationship

from api.db import Base

# 仮 修正あればmigrateする
class Room(Base):
    __tablename__="rooms"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    capacity = Column(Integer)
    img_url = Column(String(2048))
    address = Column(String(300))