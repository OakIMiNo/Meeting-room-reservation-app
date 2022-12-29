from fastapi import APIRouter

router = APIRouter()


@router.get("/rooms")
async def get_rooms():
    pass

@router.put("/rooms/{rooms_id}")
async def get_room():
    pass


@router.delete("/rooms/{task_id}")
async def unmark_room():
    pass
