import uuid
from sqlalchemy import Column, String, Numeric, Integer, DateTime, func, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship, declarative_base
from .database import Base
import enum
from datetime import datetime, timezone

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

class OrderStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    completed = "completed"
    cancelled = "cancelled"

class Order(Base):
    __tablename__ = "orders"
    id        = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id   = Column(String, ForeignKey("users.id", ondelete="SET NULL"))
    product_id = Column(String, nullable=False)
    quantity  = Column(Integer, default=1)
    address_id = Column(String, ForeignKey("addresses.id"))
    total     = Column(Numeric(10, 2))
    status    = Column(Enum(OrderStatus), default=OrderStatus.pending)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    customer_phone = Column(String(20), nullable=False)
    address_line = Column(String, nullable=False)
    city = Column(String(100), nullable=False)
    postal_code = Column(String(20), nullable=False)
