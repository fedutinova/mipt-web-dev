from pydantic import BaseModel, Field
from pydantic import ConfigDict
from typing import Optional
from decimal import Decimal

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal = Field(..., gt=0)
    in_stock: int = Field(..., ge=0)
    is_active: bool = True
    image_url: Optional[str]

class ProductCreate(ProductBase):
    name: str
    description: str | None = None
    price: Decimal = Field(..., gt=0)
    image_url: Optional[str]

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = Field(None, gt=0)
    in_stock: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None
    image_url: Optional[str] = None

class ProductOut(ProductBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
