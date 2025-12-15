from datetime import date, datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.astronomic_object import AstronomicObject
from app.models.event import Event
from app.models.constellation import Constellation

def seed_data():
    db = SessionLocal()
    
    # Созвездия
    constellations = [
        Constellation(name="Орион", short_description="Зимнее созвездие"),
        Constellation(name="Большая Медведица", short_description="Северное созвездие"),
        Constellation(name="Кассиопея", short_description="Созвездие в форме W"),
    ]
    
    for const in constellations:
        existing = db.query(Constellation).filter(Constellation.name == const.name).first()
        if not existing:
            db.add(const)
    
    db.commit()
    
    # Объекты
    objects = [
        AstronomicObject(
            name="Туманность Ориона",
            type="nebula",
            distance_ly=1344,
            magnitude=4.0,
            constellation_id=1
        ),
        AstronomicObject(
            name="Полярная звезда",
            type="star",
            distance_ly=433,
            magnitude=1.98,
            constellation_id=2
        ),
        AstronomicObject(
            name="Галактика Андромеды",
            type="galaxy",
            distance_ly=2537000,
            magnitude=3.44,
            constellation_id=3
        ),
    ]
    
    for obj in objects:
        existing = db.query(AstronomicObject).filter(AstronomicObject.name == obj.name).first()
        if not existing:
            db.add(obj)
    
    db.commit()
    
    # События
    events = [
        Event(
            title="Лунное затмение",
            date=date(2024, 5, 26),
            type="eclipse",
            visibility="global"
        ),
        Event(
            title="Метеорный поток Персеиды",
            date=date(2024, 8, 12),
            type="meteor_shower",
            visibility="northern_hemisphere"
        ),
        Event(
            title="Соединение Юпитера и Сатурна",
            date=date(2024, 12, 21),
            type="conjunction",
            visibility="global"
        ),
    ]
    
    for event in events:
        existing = db.query(Event).filter(Event.title == event.title).first()
        if not existing:
            db.add(event)
    
    db.commit()
    db.close()
    print("Тестовые данные добавлены!")

if __name__ == "__main__":
    seed_data()