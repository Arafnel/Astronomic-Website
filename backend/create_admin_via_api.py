"""Скрипт для создания тестового администратора через API"""
import requests
import json

def create_admin():
    url = "http://localhost:8000/auth/register"
    data = {
        "username": "admin",
        "email": "admin@astrumatlas.com",
        "password": "admin123"
    }
    
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("✅ Тестовый пользователь создан через API!")
            print("   Логин: admin")
            print("   Пароль: admin123")
            print("   Email: admin@astrumatlas.com")
            print("\n⚠️  Примечание: Пользователь создан как обычный пользователь.")
            print("   Чтобы сделать его администратором, нужно обновить БД вручную.")
        elif response.status_code == 400:
            error_detail = response.json().get("detail", "Неизвестная ошибка")
            if "already registered" in error_detail.lower() or "already taken" in error_detail.lower():
                print("ℹ️  Пользователь 'admin' уже существует")
            else:
                print(f"❌ Ошибка: {error_detail}")
        else:
            print(f"❌ Ошибка HTTP {response.status_code}: {response.text}")
    except requests.exceptions.ConnectionError:
        print("❌ Не удалось подключиться к серверу.")
        print("   Убедитесь, что бекенд запущен на http://localhost:8000")
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    print("🚀 Создание тестового пользователя через API...")
    print("   (Убедитесь, что бекенд запущен на http://localhost:8000)\n")
    create_admin()

