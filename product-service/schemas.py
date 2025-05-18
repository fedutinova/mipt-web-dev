from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal = Field(..., gt=0)
    in_stock: int = Field(..., ge=0)
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = Field(None, gt=0)
    in_stock: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None

class ProductOut(ProductBase):
    id: str

    class Config:
        orm_mode = True
