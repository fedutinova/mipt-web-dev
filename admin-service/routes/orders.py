from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4

router = APIRouter()

orders = {}

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    price: float
    quantity: int

class Order(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    customer_phone: str
    address_line: str
    city: str
    postal_code: str
    status: str = "pending"
    items: List[OrderItem]

@router.get("/", response_model=List[Order])
async def list_orders():
    return list(orders.values())

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = orders.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=Order)
async def update_order(order_id: str, updated: Order):
    if order_id not in orders:
        raise HTTPException(status_code=404, detail="Order not found")
    updated.id = order_id
    orders[order_id] = updated
    return updated
