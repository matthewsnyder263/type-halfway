# import sys
# from pathlib import Path

# sys.path.append(str(Path(__file__).resolve().parent.parent))
from fastapi.testclient import TestClient
from main import app
from db.matches_db import MatchQueries

client = TestClient(app)


class EmptyMatchesQueries:
    def get_all_likes(self):
        return []


def test_get_all_likes():
    app.dependency_overrides[MatchQueries] = EmptyMatchesQueries
    response = client.get("/likes")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"likes": []}


class MatchRepository:
    def get_all_matches(self):
        return []

    def create_match(self, match):
        return {
            "id": 100,
            "logged_in_user": 25,
            "matched_user": 30,
            "mutual": True,
        }

    def delete_match(self, match_id):
        return True


def test_get_matches():
    app.dependency_overrides[MatchQueries] = MatchRepository

    response = client.get("/matches")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"matches": []}


def test_delete_match():
    app.dependency_overrides[MatchQueries] = MatchRepository
    json = {"logged_in_user": 25, "matched_user": 30, "mutual": True}
    expected = True
    match_id = 100

    client.post("/matches", json=json)

    delete_response = client.delete(f"/matches/{match_id}")

    app.dependency_overrides = {}

    assert delete_response.status_code == 200
    assert delete_response.json() == expected





