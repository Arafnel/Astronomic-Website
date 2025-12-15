# AstrumAtlas Backend

FastAPI backend для каталога астрономических объектов и событий.

## Установка

1. Создайте виртуальное окружение:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Создайте файл `.env` на основе `.env.example`

4. Запустите PostgreSQL (через Docker или локально)

5. Создайте миграции и примените их:
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

6. Запустите сервер:
```bash
uvicorn app.main:app --reload
```

## Docker

Запуск с Docker Compose:
```bash
docker-compose up -d
```

## API Documentation

После запуска доступна по адресу: http://localhost:8000/docs

## Endpoints

### Auth
- POST `/auth/register` - Регистрация
- POST `/auth/login` - Авторизация
- GET `/auth/me` - Текущий пользователь

### Objects
- GET `/objects/` - Список объектов (с фильтрами)
- GET `/objects/{id}` - Объект по ID
- POST `/objects/` - Создать объект (admin)
- PUT `/objects/{id}` - Обновить объект (admin)
- DELETE `/objects/{id}` - Удалить объект (admin)

### Events
- GET `/events/` - Список событий (с фильтрами)
- GET `/events/{id}` - Событие по ID
- POST `/events/` - Создать событие (admin)
- PUT `/events/{id}` - Обновить событие (admin)
- DELETE `/events/{id}` - Удалить событие (admin)

### Constellations
- GET `/constellations/` - Список созвездий
- GET `/constellations/{id}` - Созвездие по ID

### Favorites
- GET `/favorites/` - Избранные объекты пользователя
- POST `/favorites/{object_id}` - Добавить в избранное
- DELETE `/favorites/{object_id}` - Удалить из избранного