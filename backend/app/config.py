import os

class Settings:
    database_url: str = "sqlite:///./astrumdb.db"
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

settings = Settings()