from fastapi import FastAPI, Depends, HTTPException, status
from contextlib import asynccontextmanager
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app import schemas, crud, database, models
from app.database import init_models, close_engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_models()
    async with database.AsyncSessionLocal() as db:
        if not await db.scalar(select(models.Product).limit(1)):
            db.add_all([models.Product(**p) for p in DEMO_PRODUCTS])
            await db.commit()
    yield
    await close_engine()

app = FastAPI(
    title="Product Service",
    version="1.0.0",
    lifespan=lifespan
)

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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


DEMO_PRODUCTS = [
    dict(
        name="LED-лампа E27 9 Вт (теплый свет)",
        description="Экономичная светодиодная лампочка с ресурсом 30 000 ч.",
        price=149.00,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWHhpVCoFNSO3rKm0tMUjrXPtVetFgJAbIew&s"
    ),
    dict(
        name="Умная RGB-лампа Wi-Fi E14 7 Вт",
        description="Поддержка Alexa / Google Home, 16 млн цветов.",
        price=799.00,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo88-PziXwGXpA_50SZwgxnnyM75svc3V7sw&s"
    ),
    dict(
        name="Ретро-лампа Эдисона ST64 60 Вт",
        description="Накаливание, теплый янтарный оттенок, декоративная спираль.",
        price=259.00,
        image_url="https://i1.wp.com/jazzlight.ru/wp-content/uploads/2016/11/st64f2g.jpg?fit=850%2C850&ssl=1"
    ),
]
