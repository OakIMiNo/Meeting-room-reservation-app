from sqlalchemy import Column, Integer, String, ForeignKey, Boolean

from sqlalchemy.orm import relationship

from api.db import Base

class Room(Base):
    __tablename__="rooms"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    img_url = Column(String(2048), nullable=False)
    address = Column(String(300),nullable=False)
    description = Column(String(1000), nullable=False)
    disabled = Column(Boolean, default=False,nullable=False)

    