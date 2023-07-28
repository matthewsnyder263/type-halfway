from fastapi.testclient import TestClient
from main import app
from db.user_db import UserOut, UserQueries

client = TestClient(app)


class TestUserQueries:
    def get_user_by_id(self, id):
        if id == 1:
            return UserOut(
                id=1,
                username="testuser",
                password="testpassword",
                email="test@example.com",
                full_name="Test User",
                age=25,
                mbti="INTJ",
                bio="I am a test user.",
                gender="Male",
                picture=" sdfjsdfijp.com",
                zip_code="10033",
                city="New York",
                state="NY",
                interest=" dasfsf ",
            )
        else:
            return None


def test_get_users():
    response = client.get("/api/users")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()


def test_get_user_by_id():
    app.dependency_overrides[UserQueries] = TestUserQueries
    response = client.get("/api/users/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()
