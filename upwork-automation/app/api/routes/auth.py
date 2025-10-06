from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.hash import bcrypt
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import os

from app.db.database import get_db
from app.models.user import User

router = APIRouter(tags=["auth"])
SECRET_KEY = os.getenv("SECRET_KEY", "change_me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "720"))
ADMIN_SIGNUP_SECRET = os.getenv("ADMIN_SIGNUP_SECRET", "")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ---------- LOGIN ----------
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not bcrypt.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.username, "role": user.role}, expires_delta=expires
    )
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


# ---------- CURRENT USER / ADMIN CHECK ----------
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def require_admin(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return user


# ---------- SECURE ADMIN BOOTSTRAP ----------
class AdminCreateBody(BaseModel):
    secret: str
    username: str
    password: str
    email: EmailStr | None = None


@router.post("/admin/create")
def admin_create(body: AdminCreateBody, db: Session = Depends(get_db)):
    if not ADMIN_SIGNUP_SECRET or body.secret != ADMIN_SIGNUP_SECRET:
        raise HTTPException(status_code=403, detail="Forbidden")

    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed = bcrypt.hash(body.password)
    user = User(
        username=body.username,
        password_hash=hashed,
        email=body.email,
        role="admin",
        is_active=True,
    )
    db.add(user)
    db.commit()
    return {"message": "Admin created", "username": body.username}


# ---------- CREATE USER (Admin only) ----------
@router.post("/users")
def create_user(
    username: str,
    password: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = bcrypt.hash(password)
    user = User(username=username, password_hash=hashed, role="user")
    db.add(user)
    db.commit()
    return {"message": "User created", "username": username}
