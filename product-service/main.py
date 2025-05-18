from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from . import schemas, crud, database

app = FastAPI(title="Product Service", version="1.0.0")

@app.on_event("startup")
async def on_startup():
    await database.init_models()

@app.get("/api/v1/products", response_model=List[schemas.ProductOut])
async def list_products(skip: int = 0, limit: int = 100, session: AsyncSession = Depends(database.get_session)):
    return await crud.get_products(session, skip, limit)

@app.get("/api/v1/products/{product_id}", response_model=schemas.ProductOut)
async def get_product(product_id: str, session: AsyncSession = Depends(database.get_session)):
    product = await crud.get_product(session, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/v1/products", response_model=schemas.ProductOut, status_code=status.HTTP_201_CREATED)
async def create_product(product: schemas.ProductCreate, session: AsyncSession = Depends(database.get_session)):
    return await crud.create_product(session, product)

@app.put("/api/v1/products/{product_id}", response_model=schemas.ProductOut)
async def update_product(product_id: str, upd: schemas.ProductUpdate, session: AsyncSession = Depends(database.get_session)):
    product = await crud.update_product(session, product_id, upd)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/api/v1/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, session: AsyncSession = Depends(database.get_session)):
    await crud.delete_product(session, product_id)
    return None
