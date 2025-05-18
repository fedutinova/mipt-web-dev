from pydantic import BaseModel, EmailStr, Field
from typing import List
from decimal import Decimal
from enum import Enum

class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(..., gt=0)

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    product_id: str
    product_name: str
    price: Decimal
    quantity: int

    class Config:
        orm_mode = True

class OrderStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    completed = "completed"
    cancelled = "cancelled"

class OrderOut(BaseModel):
    id: str
    customer_name: str
    customer_email: EmailStr
    status: OrderStatus
    total_price: Decimal
    items: List[OrderItemOut]

    class Config:
        orm_mode = True
