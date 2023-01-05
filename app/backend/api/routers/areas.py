from api.db import get_db
from fastapi import APIRouter, Depends
import api.models.areas as areas_model
import api.schemas.areas as areas_schema
import api.cruds.areas as areas_cruds
from sqlalchemy.ext.asyncio import AsyncSession



router = APIRouter()


@router.get("/areas")
async def get_areas(db: AsyncSession = Depends(get_db)):
    return await areas_cruds.get_all_areas(db)

