from pydantic import BaseModel,Field
from typing import Union, Optional, Tuple, List


class Area(BaseModel):
    id: int 
    name: str = Field(example="新宿区")

    class Config:
      orm_mode = True


class UpdateRoom(BaseModel):
    name: Union[str, None] = None

    class Config:
      orm_mode = True

