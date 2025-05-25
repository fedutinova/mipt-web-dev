from fastapi_users import FastAPIUsers, models
from fastapi_users.authentication import JWTStrategy, AuthenticationBackend
from app.models import User as UserModel

SECRET = "gzblhzjdf327yuihajfb"
lifetimes = {"access": 60*60, "refresh": 60*60*24*14}


class UserRead(models.BaseUser[int]):     pass
class UserCreate(models.BaseUserCreate):  pass
class UserUpdate(models.BaseUserUpdate):  pass
class UserDB(UserModel, models.BaseUserDB):    pass

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=lifetimes["access"])

# app/auth.py  (продолжение файла, где уже объявлены User, UserDB, SECRET и др.)
import uuid
import logging
from typing import AsyncGenerator, Optional

from fastapi import Depends, Request
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users.manager import BaseUserManager, UUIDIDMixin

logger = logging.getLogger(__name__)

async def get_user_db() -> AsyncGenerator[SQLAlchemyUserDatabase, None]:
    async with async_session_maker() as session:
        yield SQLAlchemyUserDatabase(session, UserModel)

class UserManager(UUIDIDMixin, BaseUserManager[UserDB, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(
        self, user: UserDB, request: Optional[Request] = None
    ) -> None:
        logger.info(f"✅ Пользователь {user.email} зарегистрирован, id={user.id}")

    async def on_after_forgot_password(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ) -> None:
        logger.info(f"🔑 Запрошен сброс пароля для id={user.id} (token={token})")


async def get_user_manager(
    user_db: SQLAlchemyUserDatabase = Depends(get_user_db),
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=JWTStrategy.JWTTransport(tokenUrl="auth/jwt/login"),
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[UserModel, str](
    get_user_manager=get_user_manager,
    auth_backends=[auth_backend],
)
