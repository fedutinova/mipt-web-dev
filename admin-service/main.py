from fastapi import FastAPI
from routes import login, products, orders
from database import engine, Base, SessionLocal
from models import Admin
from auth import get_password_hash
from routes import products, orders

app = FastAPI()

app.include_router(login.router, prefix="/admin", tags=["auth"])
app.include_router(products.router, prefix="/admin/products", tags=["products"])
app.include_router(orders.router, prefix="/admin/orders", tags=["orders"])


@app.on_event("startup")
async def on_startup():
    # 1. Создание таблиц
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Создание администратора (если его ещё нет)
    async with SessionLocal() as session:
        result = await session.execute(
            Admin.__table__.select().where(Admin.username == "admin")
        )
        admin_exists = result.first()
        if not admin_exists:
            admin = Admin(
                username="admin",
                hashed_password=get_password_hash("admin123")
            )
            session.add(admin)
            await session.commit()
