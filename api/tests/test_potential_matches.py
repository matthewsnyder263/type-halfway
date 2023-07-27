from fastapi.testclient import TestClient
from main import app
from db.potential_matches_db import PotentialMatchQueries, PotentialMatchIn, PotentialMatchOut
from authenticator import authenticator
from unittest import mock

client = TestClient(app)

class MockPotentialMatchRepo:
    def create_potential_match(self, data: PotentialMatchIn):
        # Return a mock PotentialMatchOut when creating a potential match
        return PotentialMatchOut(
            id=1,
            logged_in_user=data.logged_in_user,
            matched_user=data.matched_user,
            mbti_strength=data.mbti_strength,
            liked=data.liked,
            created_on="2023-06-30T12:00:00.000Z",  # Replace with an actual datetime string
        )

    def get_potential_matches_by_user(self, logged_in_user: int):
        # Return a list of mock PotentialMatchOut for the given logged_in_user
        return [
            PotentialMatchOut(
                id=69,
                logged_in_user=logged_in_user,
                matched_user=99,
                mbti_strength=3,
                liked=True,
                created_on="2023-06-30T12:00:00.000Z",  # Replace with an actual datetime string
            ),
            PotentialMatchOut(
                id=70,
                logged_in_user=logged_in_user,
                matched_user=98,
                mbti_strength=2,
                liked=False,
                created_on="2023-06-30T13:00:00.000Z",  # Replace with an actual datetime string
            ),
        ]


def test_create_potential_match():
    app.dependency_overrides[PotentialMatchQueries] = MockPotentialMatchRepo
    response = client.post(
        "/api/potential_matches",
        json={
            "logged_in_user": 98,
            "matched_user": 99,
            "mbti_strength": 3,
            "liked": True,
        },
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    potential_match = response.json()
    assert potential_match["id"] == 69
    assert potential_match["logged_in_user"] == 98
    assert potential_match["matched_user"] == 99
    assert potential_match["mbti_strength"] == 3
    assert potential_match["liked"] == True

def test_get_potential_matches_by_user():
    app.dependency_overrides[PotentialMatchQueries] = MockPotentialMatchRepo
    response = client.get("/api/potential_matches/user/98")
    app.dependency_overrides = {}
    assert response.status_code == 200
    potential_matches = response.json()["potential_matches"]
    # assert len(potential_matches) == 2
    # assert potential_matches[0]["logged_in_user"] == 1
    # assert potential_matches[1]["logged_in_user"] == 1
