from api.db import get_db
from fastapi import APIRouter, Depends
import api.models.areas as areas_model
import api.schemas.areas as areas_schema
import api.cruds.areas as areas_cruds
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select, update
from typing import Union, Optional, Tuple, List


async def get_all_areas(

    db: AsyncSession = Depends(get_db)
):
    # print("通過id",id)
    result: Result = await db.execute(
        select(
            areas_model.Area.id,
            areas_model.Area.name,
        ).filter(
            areas_model.Area.disabled == False
        )
    )
    areas = []
    for row in result:
      keys = ('id', 'name')
      area = dict(zip(keys, row))
      print("area", area)
      areas.append(area)

    return areas
