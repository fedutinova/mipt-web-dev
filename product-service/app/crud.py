from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from . import models, schemas

async def get_products(session: AsyncSession, skip: int = 0, limit: int = 100):
    res = await session.execute(select(models.Product).offset(skip).limit(limit))
    return res.scalars().all()

async def get_product(session: AsyncSession, product_id: str):
    res = await session.execute(select(models.Product).where(models.Product.id == product_id))
    return res.scalar_one_or_none()

async def create_product(session: AsyncSession, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    session.add(db_product)
    await session.commit()
    await session.refresh(db_product)
    return db_product

async def update_product(session: AsyncSession, product_id: str, upd: schemas.ProductUpdate):
    await session.execute(
        update(models.Product)
        .where(models.Product.id == product_id)
        .values(**{k: v for k, v in upd.dict(exclude_unset=True).items()})
    )
    await session.commit()
    return await get_product(session, product_id)

async def delete_product(session: AsyncSession, product_id: str):
    await session.execute(delete(models.Product).where(models.Product.id == product_id))
    await session.commit()

async def list_products(db: AsyncSession):
    res = await db.execute(select(models.Product))
    return res.scalars().all()
