#!/usr/bin/env python3
"""
Скрипт для создания тестовых данных
"""
from app.database import engine, Base, SessionLocal
from app.models.user import User
from app.models.constellation import Constellation
from app.models.astronomic_object import AstronomicObject
from app.models.event import Event
from app.services.auth import get_password_hash
from datetime import date

# Создаем таблицы
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Создаем созвездия
constellations = [
    Constellation(name="Орион", short_description="Зимнее созвездие"),
    Constellation(name="Большая Медведица", short_description="Северное созвездие"),
    Constellation(name="Кассиопея", short_description="Созвездие в виде буквы W")
]

for const in constellations:
    existing = db.query(Constellation).filter(Constellation.name == const.name).first()
    if not existing:
        db.add(const)

db.commit()

# Создаем объекты
objects = [
    AstronomicObject(
        name="Туманность Ориона",
        type="nebula",
        short_description="Звездообразующая туманность",
        distance_ly=1344,
        magnitude=4.0,
        constellation_id=1
    ),
    AstronomicObject(
        name="Полярная звезда",
        type="star", 
        short_description="Навигационная звезда",
        distance_ly=433,
        magnitude=1.98,
        constellation_id=2
    ),
    AstronomicObject(
        name="Галактика Андромеды",
        type="galaxy",
        short_description="Ближайшая крупная галактика",
        distance_ly=2537000,
        magnitude=3.44
    )
]

for obj in objects:
    existing = db.query(AstronomicObject).filter(AstronomicObject.name == obj.name).first()
    if not existing:
        db.add(obj)

db.commit()

# Создаем события
events = [
    Event(
        title="Лунное затмение",
        date=date(2024, 5, 26),
        type="eclipse",
        description="Полное лунное затмение",
        visibility="global"
    ),
    Event(
        title="Метеорный поток Персеиды",
        date=date(2024, 8, 12),
        type="meteor_shower", 
        description="Пик активности Персеид",
        visibility="northern"
    )
]

for event in events:
    existing = db.query(Event).filter(Event.title == event.title).first()
    if not existing:
        db.add(event)

db.commit()

# Создаем тестового пользователя
test_user = db.query(User).filter(User.username == "test").first()
if not test_user:
    test_user = User(
        username="test",
        email="test@example.com",
        password_hash=get_password_hash("123456")
    )
    db.add(test_user)
    db.commit()

print("✅ Тестовые данные созданы!")
print("👤 Тестовый пользователь: test / 123456")
db.close()