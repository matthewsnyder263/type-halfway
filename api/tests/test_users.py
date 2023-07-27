from fastapi.testclient import TestClient
from main import app
from db.user_db import UserQueries, UserIn, UserOut  # Import the UserQueries and models
from authenticator import authenticator
from typing import List, Optional
from pydantic import BaseModel

client = TestClient(app)

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    gender: str
    age: int
    mbti: str
    bio: str
    city: Optional[str]
    state: Optional[str]
    zip_code: str
    interest: str
    picture: str


class MockUserRepo:
    def get_users(self):
        return [
            UserOut(
                id=99,
                username="admin",
                email="admin@email.com",
                full_name="Admin User",
                gender="Male",
                age=30,
                mbti="INTJ",
                bio="I am an admin user.",
                zip_code="12345",
                interest="Technology",
                picture="path/to/picture",
            )
        ]

def mock_user():
    return UserOut(
        id=99,
        username="admin",
        email="admin@email.com",
        full_name="Admin User",
        gender="Male",
        age=30,
        mbti="INTJ",
        bio="I am an admin user.",
        zip_code="12345",
        interest="Technology",
        picture="path/to/picture",
    )

def test_get_users():
    app.dependency_overrides[authenticator.get_account_getter] = mock_user
    app.dependency_overrides[UserQueries] = MockUserRepo
    response = client.get("/api/users")
    app.dependency_overrides = {}
    if response.status_code == 200:
        users_dict = response.json()
        users_list = users_dict["users"]
        user = users_list[-1]
        assert user["id"] == 99
        assert user["username"] == "admin"
        assert user["email"] == "admin@email.com"
        assert user["full_name"]=="Admin User"
        assert user["gender"]=="Male"
        assert user["age"]==30
        assert user["mbti"]=="INTJ"
        assert user["bio"]=="I am an admin user."
        assert user["zip_code"]=="12345"
        assert user["interest"]=="Technology"
        assert user["picture"]=="path/to/picture"

    else:
        assert response.status_code == 404
        assert response.json() == "No users found"



