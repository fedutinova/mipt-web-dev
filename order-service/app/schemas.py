from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List
from decimal import Decimal
from enum import Enum

class OrderItemCreate(BaseModel):
    product_id: str
    product_name: str
    price: Decimal
    quantity: int = Field(..., gt=0)

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    items: List[OrderItemCreate]
    postal_code: str
    address_line: str
    city: str
    customer_phone: str

class OrderItemOut(BaseModel):
    product_id: str
    product_name: str
    price: Decimal
    quantity: int

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
    customer_phone: str
    address_line: str
    city: str
    postal_code: str
    total: Decimal
    status: OrderStatus
    items: List[OrderItemOut]

    model_config = ConfigDict(from_attributes=True)
