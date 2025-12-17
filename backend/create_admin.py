"""Скрипт для создания тестового администратора"""
from app.database import SessionLocal
from app.models.user import User
from app.services.auth import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        # Проверяем, существует ли уже пользователь
        existing_user = db.query(User).filter(User.username == "admin").first()
        if existing_user:
            print("ℹ️  Пользователь 'admin' уже существует")
            return
        
        # Создаем нового пользователя
        hashed_password = get_password_hash("admin123")
        admin_user = User(
            username="admin",
            email="admin@astrumatlas.com",
            password_hash=hashed_password,
            is_admin=True
        )
        db.add(admin_user)
        db.commit()
        print("✅ Тестовый пользователь создан!")
        print("   Логин: admin")
        print("   Пароль: admin123")
        print("   Email: admin@astrumatlas.com")
    except Exception as e:
        print(f"❌ Ошибка при создании пользователя: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()


