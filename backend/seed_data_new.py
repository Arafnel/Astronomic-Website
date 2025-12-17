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
    # Галактики
    AstronomicObject(
        name="Галактика Андромеды (M31)",
        type="galaxy",
        short_description="Ближайшая крупная галактика",
        distance_ly=2537000,
        magnitude=3.4,
        image_url="https://cdn.eso.org/images/medium/eso0604a.jpg"
    ),
    AstronomicObject(
        name="Галактика Треугольника (M33)",
        type="galaxy",
        short_description="Третья крупная галактика в Местной группе",
        distance_ly=3000000,
        magnitude=5.7,
        image_url="https://cdn.eso.org/images/medium/eso0738a.jpg"
    ),
    AstronomicObject(
        name="Галактика Боде (M81)",
        type="galaxy",
        short_description="Спиральная галактика в Большой Медведице",
        distance_ly=12000000,
        magnitude=6.9,
        image_url="https://cdn.eso.org/images/medium/eso1032a.jpg"
    ),
    AstronomicObject(
        name="Галактика Девы (M87)",
        type="galaxy",
        short_description="Эллиптическая галактика с чёрной дырой",
        distance_ly=53000000,
        magnitude=8.6,
        image_url="https://cdn.eso.org/images/medium/eso2208a.jpg"
    ),
    AstronomicObject(
        name="Галактика Сомбреро (M104)",
        type="galaxy",
        short_description="Спиральная галактика в созвездии Дева",
        distance_ly=29000000,
        magnitude=8.0,
        image_url="https://cdn.eso.org/images/medium/eso0820a.jpg"
    ),
    
    # Туманности
    AstronomicObject(
        name="Туманность Ориона (M42)",
        type="nebula",
        short_description="Звездообразующая туманность",
        distance_ly=1344,
        magnitude=4.0,
        constellation_id=1,
        image_url="https://cdn.eso.org/images/medium/eso0205a.jpg"
    ),
    AstronomicObject(
        name="Кольцевая туманность (M57)",
        type="nebula",
        short_description="Планетарная туманность в Лире",
        distance_ly=2300,
        magnitude=8.8,
        image_url="https://cdn.eso.org/images/medium/eso0144a.jpg"
    ),
    AstronomicObject(
        name="Крабовидная туманность (M1)",
        type="nebula",
        short_description="Остаток сверхновой звезды",
        distance_ly=6500,
        magnitude=8.4,
        constellation_id=3,
        image_url="https://cdn.eso.org/images/medium/eso0609a.jpg"
    ),
    AstronomicObject(
        name="Туманность Северная Америка",
        type="nebula",
        short_description="Эмиссионная туманность в Лебеде",
        distance_ly=2590,
        magnitude=4.0,
        image_url="https://cdn.eso.org/images/medium/eso1318a.jpg"
    ),
    AstronomicObject(
        name="Туманность Орел (M16)",
        type="nebula",
        short_description="Звездообразующая туманность",
        distance_ly=7000,
        magnitude=6.0,
        image_url="https://cdn.eso.org/images/medium/eso9901a.jpg"
    ),
    
    # Звезды
    AstronomicObject(
        name="Сириус (Альфа Большого Пса)",
        type="star",
        short_description="Ярчайшая звезда ночного неба",
        distance_ly=8.6,
        magnitude=-1.46,
        image_url="https://cdn.eso.org/images/medium/eso0936a.jpg"
    ),
    AstronomicObject(
        name="Канопус (Альфа Киля)",
        type="star",
        short_description="Вторая по яркости звезда",
        distance_ly=310,
        magnitude=-0.74,
        image_url="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg"
    ),
    AstronomicObject(
        name="Ригель (Бета Ориона)",
        type="star",
        short_description="Голубой сверхгигант",
        distance_ly=860,
        magnitude=0.13,
        constellation_id=1,
        image_url="https://cdn.eso.org/images/medium/eso0936a.jpg"
    ),
    AstronomicObject(
        name="Вега (Альфа Лиры)",
        type="star",
        short_description="Третья по яркости звезда",
        distance_ly=25,
        magnitude=0.03,
        image_url="https://cdn.eso.org/images/medium/eso0840a.jpg"
    ),
    AstronomicObject(
        name="Бетельгейзе (Альфа Ориона)",
        type="star",
        short_description="Красный сверхгигант",
        distance_ly=640,
        magnitude=0.50,
        constellation_id=1,
        image_url="https://cdn.eso.org/images/medium/eso2108a.jpg"
    ),
    AstronomicObject(
        name="Полярная звезда (Альфа Малой Медведицы)",
        type="star",
        short_description="Навигационная звезда",
        distance_ly=433,
        magnitude=1.98,
        constellation_id=2,
        image_url="https://cdn.eso.org/images/medium/eso1525a.jpg"
    ),
    
    # Звездные скопления
    AstronomicObject(
        name="Плеяды (M45)",
        type="star_cluster",
        short_description="Открытое звёздное скопление",
        distance_ly=444,
        magnitude=1.6,
        image_url="https://cdn.eso.org/images/medium/eso0151a.jpg"
    ),
    AstronomicObject(
        name="Геркулес (M13)",
        type="star_cluster",
        short_description="Шаровое звёздное скопление",
        distance_ly=25100,
        magnitude=5.8,
        image_url="https://cdn.eso.org/images/medium/eso0917a.jpg"
    ),
    AstronomicObject(
        name="M22 (Стрелец)",
        type="star_cluster",
        short_description="Шаровое звёздное скопление",
        distance_ly=10400,
        magnitude=5.1,
        image_url="https://cdn.eso.org/images/medium/eso0311a.jpg"
    ),
    
    # Планеты
    AstronomicObject(
        name="Юпитер",
        type="planet",
        short_description="Самая большая планета Солнечной системы",
        distance_ly=0.000083,
        magnitude=-2.94,
        image_url="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"
    ),
    AstronomicObject(
        name="Сатурн",
        type="planet",
        short_description="Планета с кольцами",
        distance_ly=0.000151,
        magnitude=0.46,
        image_url="https://images.unsplash.com/photo-1446776877081-d282a0f896e2"
    ),
    AstronomicObject(
        name="Марс",
        type="planet",
        short_description="Красная планета",
        distance_ly=0.000024,
        magnitude=-2.6,
        image_url="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"
    ),
    AstronomicObject(
        name="Венера",
        type="planet",
        short_description="Самая горячая планета",
        distance_ly=0.000004,
        magnitude=-4.6,
        image_url="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a"
    ),
    
    # Чёрные дыры
    AstronomicObject(
        name="Sagittarius A* (Черная дыра Млечного Пути)",
        type="black_hole",
        short_description="Сверхмассивная чёрная дыра в центре Млечного Пути",
        distance_ly=26000,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso2208a.jpg"
    ),
    AstronomicObject(
        name="M87* (Черная дыра в M87)",
        type="black_hole",
        short_description="Первая сфотографированная чёрная дыра",
        distance_ly=53000000,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso1907a.jpg"
    ),
    AstronomicObject(
        name="Cygnus X-1",
        type="black_hole",
        short_description="Первая открытая чёрная дыра",
        distance_ly=7200,
        magnitude=8.95,
        image_url="https://cdn.eso.org/images/medium/eso1328a.jpg"
    ),
    
    # Кометы
    AstronomicObject(
        name="Комета Галлея",
        type="comet",
        short_description="Периодическая комета",
        distance_ly=0.000006,
        magnitude=28.2,
        image_url="https://cdn.eso.org/images/medium/eso0932a.jpg"
    ),
    AstronomicObject(
        name="Комета Хейала-Боппа",
        type="comet",
        short_description="Яркая комета, видна невооружённым глазом",
        distance_ly=0.000014,
        magnitude=-1.8,
        image_url="https://cdn.eso.org/images/medium/eso9701a.jpg"
    ),
    
    # Пульсары
    AstronomicObject(
        name="PSR B1919+21 (Первый пульсар)",
        type="pulsar",
        short_description="Первый открытый пульсар",
        distance_ly=2283,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso0609a.jpg"
    ),
    AstronomicObject(
        name="Пульсар в Крабовидной туманности",
        type="pulsar",
        short_description="Пульсар в остатке сверхновой",
        distance_ly=6500,
        magnitude=16.5,
        constellation_id=3,
        image_url="https://cdn.eso.org/images/medium/eso0609a.jpg"
    ),
    
    # Экзопланеты
    AstronomicObject(
        name="Proxima Centauri b",
        type="exoplanet",
        short_description="Экзопланета в системе ближайшей звезды",
        distance_ly=4.24,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso1713a.jpg"
    ),
    AstronomicObject(
        name="Kepler-452b (Земля 2.0)",
        type="exoplanet",
        short_description="Потенциально обитаемая экзопланета",
        distance_ly=1402,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso1724a.jpg"
    ),
    AstronomicObject(
        name="TRAPPIST-1e",
        type="exoplanet",
        short_description="Экзопланета в обитаемой зоне",
        distance_ly=40,
        magnitude=0,
        image_url="https://cdn.eso.org/images/medium/eso1706a.jpg"
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
