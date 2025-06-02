from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4

router = APIRouter()

products = {}

class Product(BaseModel):
    id: str
    name: str
    price: float
    description: str | None = None

@router.get("/", response_model=List[Product])
async def list_products():
    return list(products.values())

@router.post("/", response_model=Product)
async def create_product(product: Product):
    product.id = str(uuid4())
    products[product.id] = product
    return product

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = products.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, updated: Product):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    updated.id = product_id
    products[product_id] = updated
    return updated

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    del products[product_id]
    return {"detail": "Product deleted"}
