from fastapi import APIRouter, HTTPException
from typing import List
from db.matches_db import MatchQueries, MatchIn, MatchOut
from db.user_db import UserOut, UserQueries

router = APIRouter()
match_queries = MatchQueries()
user_queries = UserQueries()

@router.post("/matches", response_model=MatchOut, status_code=201)
def create_match(match: MatchIn) -> MatchOut:
    loggedInUser = user_queries.get_user_by_id(match.logged_in_user)
    matchedUser = user_queries.get_user_by_id(match.matched_user)

    if not loggedInUser or not matchedUser:
        raise HTTPException(status_code=404, detail="User not found.")

    # Check if both users have liked each other
    if match.liked_user1 and match.liked_user2:
        new_match = match_queries.create_match(match)
        return new_match
    else:
        raise HTTPException(status_code=400, detail="Both users must like each other to create a match.")

@router.get("/matches/{logged_in_user}", response_model=List[MatchOut])
def get_matches(logged_in_user: int) -> List[MatchOut]:
    user = user_queries.get_user_by_id(logged_in_user)

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    matches = match_queries.get_matches_by_user(logged_in_user)
    return matches
