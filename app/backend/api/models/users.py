from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from api.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(254), nullable=True)
    email = Column(String(254), unique=True, nullable=False)
    hashed_password = Column(String(72), unique=True, nullable=False)
    disabled = Column(Boolean, default=False, nullable=False)
    admin = Column(Boolean, default=False, nullable=False)


#reservations = relationship("Reservation", back_populates="user_id")
