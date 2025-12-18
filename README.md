# 🌌 AstrumAtlas — Astronomic Objects & Events Directory

**AstrumAtlas** (*astrum* — звезда, *atlas* — сборник) — веб-платформа для просмотра астрономических объектов, изучения космических событий и ведения персонального списка «избранного».

Проект построен по современной **SPA + REST API** архитектуре и готов к расширению (NASA API, карты звёздного неба, мобильные клиенты).

## 🧱 Архитектура проекта

```
AstrumAtlas/
│
├── backend/                # FastAPI + БД
│   ├── app/
│   │   ├── models/         # SQLAlchemy модели
│   │   ├── schemas/        # Pydantic схемы
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Бизнес-логика
│   │   ├── database.py
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── media/              # Загружаемые изображения
│   │   ├── objects/
│   │   └── events/
│   │
│   ├── alembic/            # Миграции БД
│   ├── astrumdb.db         # SQLite (dev)
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── api/            # HTTP-запросы
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── styles/
│   └── index.html
│
└── README.md
```

## 🚀 Стек технологий

### 🎨 Frontend

* React 18 + Vite
* React Router
* Tailwind CSS (космическая тема)
* Axios
* Lucide React (иконки)
* React Hook Form

### 🐍 Backend

* FastAPI
* SQLAlchemy + Alembic
* SQLite (dev) / PostgreSQL (prod)
* JWT Authentication
* Pydantic
* Static Files (изображения)

---

## 🛠️ Быстрый старт

### Backend (локально)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Настройте DATABASE_URL
uvicorn app.main:app --reload
```

API будет доступно на:

```
http://localhost:8000
http://localhost:8000/docs
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

### 🐳 Docker (рекомендуется)

```bash
cd backend
docker-compose up -d
```

## 📱 UI и дизайн

### 🎨 Концепция

* Космическая тёмная тема
* Градиенты space / cosmic
* Glassmorphism (backdrop-blur)
* Mobile-first
* Hover-анимации и transitions

### 🧩 Основные компоненты

* `ObjectCard` — астрономические объекты + избранное
* `EventCard` — космические события
* `Header` — навигация
* `LoadingSpinner` — анимированный спиннер

## 🎯 Страницы

* **Главная** — Hero + статистика
* **Объекты** — каталог, поиск, фильтры
* **События** — календарь и типы
* **Избранное** — персональная коллекция
* **Авторизация** — login / register


## 🔗 API Endpoints

### 🔐 Auth

```
POST   /auth/register
POST   /auth/login
GET    /auth/me
```

### 🌌 Objects

```
GET    /objects/
GET    /objects/{id}
POST   /objects/          # admin
```

### 📅 Events

```
GET    /events/
GET    /events/{id}
POST   /events/           # admin
```

### ⭐ Favorites

```
GET    /favorites/
POST   /favorites/{object_id}
DELETE /favorites/{object_id}
```

## 🗄️ Структура базы данных

```
users
- id
- username
- email
- password_hash
- is_admin

objects
- id
- name
- type
- distance_ly
- magnitude
- image_path
- constellation_id

events
- id
- title
- date
- type
- visibility
- image_path

constellations
- id
- name
- short_description

favorites
- user_id
- object_id
```

## 🎨 Кастомизация дизайна

### Цвета

```
space:  #0c0c0c → #312e81
cosmic: #fdf4ff → #701a75
```

### Градиенты

```css
space-gradient: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)
cosmic-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### UI-классы

* `.card` — glassmorphism
* `.btn-primary` — космический градиент
* `.input-field` — тёмные поля

## ✅ Реализовано

* JWT аутентификация
* CRUD для объектов и событий
* Загрузка изображений
* Избранное
* Адаптивный UI
* Docker
* Swagger API (`/docs`)

## 🚀 Планы развития

* Детальные страницы объектов
* Интеграция с NASA API
* Карта звёздного неба
* Уведомления о событиях
* Социальные функции
* Light / Dark theme
* Мобильное приложение
