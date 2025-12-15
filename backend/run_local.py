#!/usr/bin/env python3
"""
Локальный запуск без Docker
"""
import uvicorn
from app.database import engine, Base

# Создаем таблицы
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)