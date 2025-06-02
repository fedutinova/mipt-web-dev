from fastapi import APIRouter, Depends, HTTPException
import httpx
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")

ORDER_SERVICE_URL = "http://order-service:8000/api/v1/orders"

@router.get("/")
async def get_orders(token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        response = await client.get(ORDER_SERVICE_URL)
    return response.json()

@router.put("/{order_id}")
async def update_order_status(order_id: str, status: dict, token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        response = await client.put(f"{ORDER_SERVICE_URL}/{order_id}", json=status)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()