from sqlalchemy import Column, Integer, String,  Boolean

from sqlalchemy.orm import relationship

from api.db import Base

class Area(Base):
    __tablename__="areas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    disabled = Column(Boolean, default=False, nullable=False)

    room = relationship("Room", back_populates="areas")
