import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models import Base, User

class Address(Base):
    __tablename__ = "addresses"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"))
    full_name  = Column(String, nullable=False)
    phone      = Column(String, nullable=False)
    line1      = Column(String, nullable=False)
    line2      = Column(String)
    city       = Column(String, nullable=False)
    postcode   = Column(String, nullable=False)
    user = relationship(User, backref="addresses")
