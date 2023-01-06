from api.db import get_db
from fastapi import APIRouter, Depends
import api.models.rooms as rooms_model
import api.schemas.rooms as rooms_schema
import api.cruds.rooms as rooms_cruds
from sqlalchemy.ext.asyncio import AsyncSession



router = APIRouter()


@router.get("/rooms")
async def get_rooms(db: AsyncSession = Depends(get_db)):
    return await rooms_cruds.get_all_rooms(db)


@router.get("/rooms/{room_id}")
async def get_room(
    room_id: int, 
    db: AsyncSession = Depends(get_db)
    ):
    return await rooms_cruds.get_room(room_id, db)


@router.post("/rooms")
async def create_rooms(
    rooms_body: rooms_schema.CreateRoom,
    db: AsyncSession = Depends(get_db)
):
    return await rooms_cruds.create_rooms(rooms_body,db)


@router.put("/rooms/{room_id}")
async def update_room(
    room_id: int, 
    room_body: rooms_schema.UpdateRoom, 
    db: AsyncSession = Depends(get_db)
    ):
    print("room_body",room_body)
    original = await rooms_cruds.get_room(room_id, db)
    return await rooms_cruds.update_room(room_body, original, db)
