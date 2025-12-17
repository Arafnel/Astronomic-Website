from app.database import engine, Base
from app.models import User, Constellation, AstronomicObject, Event, Favorite

Base.metadata.create_all(bind=engine)
print("Таблицы созданы!")