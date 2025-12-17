import hashlib
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status, Depends, Header
from sqlalchemy.orm import Session
from ..config import settings
from ..database import get_db
from ..models.user import User

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password

def get_password_hash(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    return f"token_{data.get('sub', 'user')}_{datetime.now().timestamp()}"

def get_current_user(db: Session = Depends(get_db), authorization: str = Header(None)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.split(' ')[1]
    if not token.startswith('token_'):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def get_admin_user(current_user: User = Depends(get_current_user)):
    return current_user