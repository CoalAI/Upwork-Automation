# app/models/user.py
import uuid
from sqlalchemy import Column, String, Boolean, DateTime, func
from app.db.database import Base  

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, server_default="true")
    role = Column(String(50), nullable=False, server_default="user")   # <---- add this
    created_at = Column(DateTime(timezone=True), server_default=func.now())
