from api.db import get_db
from fastapi import APIRouter, Depends
import api.models.rooms as rooms_model
import api.schemas.rooms as rooms_schema
import api.cruds.rooms as rooms_cruds
import api.models.areas as areas_model

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select, update
from typing import Union, Optional, Tuple, List

async def create_rooms(
    rooms_body: rooms_schema.CreateRoom,
    db: AsyncSession = Depends(get_db)
) -> rooms_model.Room:
    print("通過通過", rooms_body)
    create_room = {
        "name": rooms_body.name,
        "capacity": rooms_body.capacity,
        "img_url": rooms_body.img_url,
        "address": rooms_body.address,
        "description": rooms_body.description,
        "disabled": False
        }
    room = rooms_model.Room(**create_room)
    db.add(room)
    await db.commit()
    await db.refresh(room)
    return room

# 返り値の型未定義
async def get_all_rooms(
    # id: int, 

    db: AsyncSession = Depends(get_db)
    ) :
    # print("通過id",id)
    result: Result = await db.execute(
        select(
            rooms_model.Room.id,
            rooms_model.Room.name,
            rooms_model.Room.capacity,
            rooms_model.Room.img_url,
            rooms_model.Room.address,
            rooms_model.Room.description,
            # rooms_model.Room.disabled,
            rooms_model.Room.area_id,
        ).filter(
            rooms_model.Room.disabled == False
        )
    )
    rooms = []
    for row in result:
      keys = ('id', 'name', 'capacity', 'img_url', 'address', 'description','area_id')
      room = dict(zip(keys, row))
      print("room", room)
      rooms.append(room)
    
    return rooms


async def get_room(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    print("通過id",id)
    result: Result = await db.execute(
        select(
            rooms_model.Room.id,
            rooms_model.Room.name,
            rooms_model.Room.capacity,
            rooms_model.Room.img_url,
            rooms_model.Room.address,
            rooms_model.Room.description,
            rooms_model.Room.area_id,
        ).filter(
            rooms_model.Room.disabled == False
        ).filter(
            rooms_model.Room.id == id
        )
    )

    keys = ('id', 'name', 'capacity', 'img_url', 'address', 'description','area_id')
    room = dict(zip(keys, result.first()))
    print("get_room",room)
    return room


async def update_room(
    update_room: rooms_schema.UpdateRoom,
    original: rooms_schema.UpdateRoom,
    db: AsyncSession = Depends(get_db)
    ):

    print("original_id", original['id'])
    db_room = await db.get(rooms_model.Room,original['id'])
    print("db_room", db_room)

    update_data = update_room.dict(exclude_unset=True)
    print("update_data", update_data)

    for key, value in update_data.items():
        setattr(db_room, key, value)
    
    print("db_room", db_room)

    db.add(db_room)
    await db.commit()
    await db.refresh(db_room)
    return db_room

