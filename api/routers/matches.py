from fastapi import APIRouter, HTTPException
from typing import List
from db.matches_db import MatchQueries, MatchIn, MatchOut
from db.user_db import UserOut, UserQueries

router = APIRouter()
match_queries = MatchQueries()
user_queries = UserQueries()

@router.post("/matches", response_model=MatchOut, status_code=201)
def create_match(match: MatchIn) -> MatchOut:
    user1 = user_queries.get_user_by_id(match.user1_id)
    user2 = user_queries.get_user_by_id(match.user2_id)

    if not user1 or not user2:
        raise HTTPException(status_code=404, detail="User not found.")

    # Check if both users have liked each other
    if match.liked_user1 and match.liked_user2:
        new_match = match_queries.create_match(match)
        return new_match
    else:
        raise HTTPException(status_code=400, detail="Both users must like each other to create a match.")

@router.get("/matches/{user_id}", response_model=List[MatchOut])
def get_matches(user_id: int) -> List[MatchOut]:
    user = user_queries.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    matches = match_queries.get_matches_by_user(user_id)
    return matches
