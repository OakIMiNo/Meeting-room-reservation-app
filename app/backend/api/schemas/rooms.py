from pydantic import BaseModel,Field
from typing import Union, Optional, Tuple, List


class Room(BaseModel):
    id: int 
    name: str = Field(example="example_room")
    capacity: int = Field(example=12)
    img_url: str = Field(example="https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/0_rooms_example.jpg")
    address: str = Field(example="東京都新宿区西新宿××")
    description: str = Field(example="example 駅から徒歩3分、××、△△完備")
    disabled: bool = Field(example=False)

    area_id: int = Field(example=4)


    class Config:
      orm_mode = True


class CreateRoom(BaseModel):
    name: str = Field(example="example_room")
    capacity: int = Field(example=12)
    img_url: str = Field(
        example="https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/0_rooms_example.jpg")
    address: str = Field(example="東京都新宿区西新宿××")
    description: str = Field(example="example 駅から徒歩3分、××、△△完備")
    disabled: bool = Field(example=False)

    area_id: int = Field(example=4)



    class Config:
      orm_mode = True

class UpdateRoom(BaseModel):
    name: Union[str, None] = None
    capacity: Union[str, None] = None
    img_url: Union[str, None] = None
    address: Union[str, None] = None
    disabled: Union[bool , None] = None

    area_id:  Union[int, None] = None



    class Config:
      orm_mode = True

