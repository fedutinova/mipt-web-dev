from fastapi import FastAPI, Depends, HTTPException, status
from contextlib import asynccontextmanager
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, database, schemas, models
from app.database import init_models, close_engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_models()
    yield
    await close_engine()

def create_app() -> FastAPI:
    app = FastAPI(title="Order Service", version="1.0.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.post("/api/v1/orders", response_model=schemas.OrderOut, status_code=status.HTTP_201_CREATED)
    async def create_order(order: schemas.OrderCreate, session: AsyncSession = Depends(database.get_session)):
        return await crud.create_order(session, order)

    @app.get("/api/v1/orders", response_model=List[schemas.OrderOut])
    async def list_orders(skip: int = 0, limit: int = 100, session: AsyncSession = Depends(database.get_session)):
        return await crud.get_orders(session, skip, limit)

    @app.get("/api/v1/orders/{order_id}", response_model=schemas.OrderOut)
    async def get_order(order_id: str, session: AsyncSession = Depends(database.get_session)):
        order = await crud.get_order(session, order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    @app.put("/api/v1/orders/{order_id}/status", response_model=schemas.OrderOut)
    async def update_order_status(order_id: str, status: schemas.OrderStatus, session: AsyncSession = Depends(database.get_session)):
        order = await crud.update_status(session, order_id, models.OrderStatus(status))
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    @app.delete("/api/v1/orders/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete_order(order_id: str, session: AsyncSession = Depends(database.get_session)):
        await crud.delete_order(session, order_id)
        return None

    return app
