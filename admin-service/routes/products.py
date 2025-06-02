from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_products():
    return [{"id": 1, "name": "Sample Product"}]