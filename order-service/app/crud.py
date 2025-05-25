from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from decimal import Decimal
import httpx, os

from . import models, schemas

PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://product-service:8000")

async def fetch_product(product_id: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{PRODUCT_SERVICE_URL}/api/v1/products/{product_id}")
        res.raise_for_status()
        return res.json()

async def create_order(session: AsyncSession, order: schemas.OrderCreate):
    items = []
    total = Decimal("0.00")
    for item in order.items:
        product = await fetch_product(item.product_id)
        price = Decimal(str(product["price"]))
        total += price * item.quantity
        items.append({
            "product_id": item.product_id,
            "product_name": product["name"],
            "price": price,
            "quantity": item.quantity
        })
    db_order = models.Order(
        customer_name=order.customer_name,
        customer_email=order.customer_email,
        total_price=total,
        customer_phone=order.customer_phone,
        address_line=order.address_line,
        city=order.city,
        postal_code=order.postal_code
    )
    session.add(db_order)
    await session.flush()  # to get ID
    db_order.items = [models.OrderItem(order_id=db_order.id, **i) for i in items]
    await session.commit()
    await session.refresh(db_order)
    return db_order

async def get_orders(session: AsyncSession, skip: int = 0, limit: int = 100):
    res = await session.execute(select(models.Order).offset(skip).limit(limit))
    return res.scalars().unique().all()

async def get_order(session: AsyncSession, order_id: str):
    res = await session.execute(select(models.Order).where(models.Order.id == order_id))
    return res.scalar_one_or_none()

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
