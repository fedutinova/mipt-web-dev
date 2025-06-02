from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload
from decimal import Decimal
import os
import httpx

from . import models, schemas

PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://product-service:8000")

async def fetch_product_async(product_id: str) -> dict:
    url = f"{PRODUCT_SERVICE_URL}/api/v1/products/{product_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()

async def create_order(session: AsyncSession, order: schemas.OrderCreate):
    items = []
    total = Decimal("0.00")

    for item in order.items:
        product = await fetch_product_async(item.product_id)
        price = Decimal(str(product["price"]))
        total += price * item.quantity
        items.append({
            "product_id": item.product_id,
            "product_name": product["name"],
            "price": price,
            "quantity": item.quantity
        })

    async with session.begin():
        db_order = models.Order(
            customer_name=order.customer_name,
            customer_email=order.customer_email,
            customer_phone=order.customer_phone,
            address_line=order.address_line,
            city=order.city,
            postal_code=order.postal_code,
            total=total
        )
        session.add(db_order)
        await session.flush()

        for i in items:
            session.add(models.OrderItem(order_id=db_order.id, **i))

    result = await session.execute(
        select(models.Order)
        .options(selectinload(models.Order.items))
        .where(models.Order.id == db_order.id)
    )
    return result.scalar_one()

async def get_orders(session: AsyncSession, skip: int = 0, limit: int = 100):
    result = await session.execute(select(models.Order).offset(skip).limit(limit))
    return result.scalars().unique().all()

async def get_order(session: AsyncSession, order_id: str):
    result = await session.execute(select(models.Order).where(models.Order.id == order_id))
    return result.scalar_one_or_none()

async def update_status(session: AsyncSession, order_id: str, status: models.OrderStatus):
    await session.execute(
        update(models.Order)
        .where(models.Order.id == order_id)
        .values(status=status)
    )
    await session.commit()
    return await get_order(session, order_id)

async def delete_order(session: AsyncSession, order_id: str):
    await session.execute(delete(models.Order).where(models.Order.id == order_id))
    await session.commit()
