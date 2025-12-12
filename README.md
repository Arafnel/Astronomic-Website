# 🌌 **README.md — AstrumAtlas**

Каталог астрономических объектов и событий
*React + FastAPI + PostgreSQL*

---

# 🌠 **AstrumAtlas — Astronomic Objects & Events Directory**

**AstrumAtlas** (*astrum — звезда, atlas — сборник*) — это веб-платформа для просмотра астрономических объектов, изучения космических событий и ведения личного списка «избранного».
Проект разработан как учебный пример современного веб-приложения с фронтендом, бэкендом и базой данных.

---

## 🚀 **Стек технологий**

### 🎨 **Frontend**

* React (SPA)
* React Router
* Axios / Fetch API
* Tailwind CSS / Styled Components
* Semantic HTML5

### 🐍 **Backend**

* FastAPI
* Pydantic
* SQLAlchemy
* Alembic (миграции)
* JWT Auth

### 🗄️ **Database**

* PostgreSQL (pgAdmin / Docker)
* ORM-модели через SQLAlchemy

---

# 🛰️ **Функциональность проекта**

### ⭐ **Пользователь**

* регистрация и авторизация
* личный кабинет
* добавление объектов в избранное

### 🪐 **Астрономические объекты**

* просмотр списка
* просмотр карточки объекта
* фильтры (планеты, звезды, галактики)
* поиск 🔍

### 🌌 **Астрономические события**

* календарь ближайших событий
* полные карточки событий

### 🔖 **Избранное**

* отображение сохранённых объектов
* добавление/удаление одним кликом

### ☄️ **Интеграция с внешним API**

* NASA APOD / Solar System API
* отображение данных на главной странице

---

# 🧭 **Структура проекта**

```
/backend
    /app
        /routers
        /models
        /schemas
        /database.py
        /main.py
/frontend
    /src
        /components
        /pages
        /hooks
        /api
        App.jsx
        main.jsx
```

---

# 🔗 **REST API (Backend Overview)**

## 🔐 Auth

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | регистрация          |
| POST   | `/auth/login`    | логин                |
| GET    | `/auth/me`       | текущий пользователь |

## 🪐 Objects

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | `/objects/`     | список объектов |
| GET    | `/objects/{id}` | объект по id    |
| POST   | `/objects/`     | создать объект  |
| DELETE | `/objects/{id}` | удалить объект  |

## 🌌 Events

| Method | Endpoint   |
| ------ | ---------- |
| GET    | `/events/` |
| POST   | `/events/` |

## ⭐ Favorites

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/favorites/`            |
| POST   | `/favorites/{object_id}` |
| DELETE | `/favorites/{object_id}` |

---

# 🗄️ ** ER-диаграмма базы данных (описание)**

### 👤 users

* id
* email
* password_hash
* created_at

### 🪐 astronomic_objects

* id
* name
* type (planet, star, galaxy, nebula, etc.)
* distance
* image_url
* description

### 🌌 events

* id
* title
* date
* visibility_zone
* magnitude

### ⭐ favorites

* user_id → users.id
* object_id → astronomic_objects.id

---

# 🛠️ **Установка и запуск**

## 🔽 Клонирование репозитория

```bash
git clone https://github.com/USERNAME/astrumatlas.git
cd astrumatlas
```

---

## 🐍 **Backend — установка**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🎨 **Frontend — установка**

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ **Database (PostgreSQL)**

Создать `.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/astrumdb
SECRET_KEY=your_secret
```

---

# ⭐ **Принцип работы (Frontend → Backend)**

### React:

```js
const res = await axios.get("http://localhost:8000/objects");
setObjects(res.data);
```

### FastAPI:

```python
@app.get("/objects/")
def get_objects(db: Session = Depends(get_db)):
    return db.query(AstronomicObject).all()
```

---

# 🎯 **Соответствие требованиям преподавателя**

✔ семантика HTML5
✔ адаптивность (mobile-first)
✔ формы, обработка данных
✔ интерактивность (кнопки, фильтры, события)
✔ React: компоненты, хуки, Router
✔ API между фронтом и бэком
✔ работа с внешним API
✔ ORM + PostgreSQL
✔ структурированный код

---

# 🌟 **Скриншоты (место для добавления)**

```
/screenshots
    home.png
    catalog.png
    details.png
    events.png
```

Скажи, что добавить!
