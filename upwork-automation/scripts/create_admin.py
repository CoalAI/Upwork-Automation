# upwork-automation/scripts/manage_users.py

import sys
import getpass
from app.db.database import Base, engine, SessionLocal
from app.models.users import User  # <-- your file at app/models/users.py
try:
    # use the same hashing as your auth route
    from app.core.security import hash_password
except Exception:
    # fallback (only if you didn't add app/core/security.py)
    from passlib.context import CryptContext
    _pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
    def hash_password(p: str) -> str:
        return _pwd_ctx.hash(p)

def ensure_tables():
    """Create tables if missing (users included)."""
    Base.metadata.create_all(bind=engine)

def create_user(username: str, password: str, email: str | None = None):
    with SessionLocal() as db:
        if db.query(User).filter(User.username == username).first():
            print("User already exists")
            return
        u = User(username=username, email=email, password_hash=hash_password(password), is_active=True)
        db.add(u)
        db.commit()
        print(f"Created user '{username}'")

def set_password(username: str, password: str):
    with SessionLocal() as db:
        u = db.query(User).filter(User.username == username).first()
        if not u:
            print("User not found")
            return
        u.password_hash = hash_password(password)
        db.commit()
        print(f"Password updated for '{username}'")

if __name__ == "__main__":
    ensure_tables()
    if len(sys.argv) < 2:
        print(
            "Usage:\n"
            "  py scripts/manage_users.py create <username> [email]\n"
            "  py scripts/manage_users.py passwd <username>\n"
        )
        sys.exit(1)

    cmd = sys.argv[1].lower()
    if cmd == "create":
        if len(sys.argv) < 3:
            print("Missing <username>")
            sys.exit(1)
        username = sys.argv[2]
        email = sys.argv[3] if len(sys.argv) > 3 else None
        pwd = getpass.getpass("Password: ")
        create_user(username, pwd, email)
    elif cmd == "passwd":
        if len(sys.argv) < 3:
            print("Missing <username>")
            sys.exit(1)
        username = sys.argv[2]
        pwd = getpass.getpass("New Password: ")
        set_password(username, pwd)
    else:
        print("Unknown command")
