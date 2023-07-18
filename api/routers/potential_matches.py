from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from db.potential_matches_db import (
    PotentialMatch,
    PotentialMatchIn,
    PotentialMatchOut,
    PotentialMatchQueries
)
from db.user_db import UserOut, UserQueries


router = APIRouter()
potential_match_queries = PotentialMatchQueries()
user_queries = UserQueries()


@router.post(
    "/potential_matches", response_model=PotentialMatchOut, status_code=201
)
def create_potential_match(
    potential_match: PotentialMatchIn,
) -> PotentialMatchOut:
    logged_in_user = user_queries.get_user_by_id(
        potential_match.logged_in_user
    )
    match_user = user_queries.get_user_by_id(potential_match.user_id)

    if not logged_in_user or not match_user:
        raise HTTPException(status_code=404, detail="User not found.")

    new_potential_match = potential_match_queries.create_potential_match(
        potential_match
    )
    return new_potential_match


@router.get(
    "/potential_matches/{user_id}", response_model=List[PotentialMatchOut]
)
def get_potential_matches(user_id: int) -> List[PotentialMatchOut]:
    user = user_queries.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    potential_matches = potential_match_queries.get_potential_matches_by_user(
        user_id
    )
    return potential_matches


@router.put("/potential-matches/{match_id}", response_model=PotentialMatchOut)
async def update_potential_match(match_id: int, liked: bool):
    potential_match = potential_match_queries.get_potential_matches_by_user(match_id)
    if not potential_match:
        raise HTTPException(status_code=404, detail="Potential match not found")

    updated_match = potential_match_queries.update_potential_match(match_id, liked)
    return updated_match
