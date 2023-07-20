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
        raise HTTPException(
            status_code=400,
            detail="Both users must like each other to create a match.",
        )


@router.get("/matches/{user_id}", response_model=List[MatchOut])
def get_matches(user_id: int) -> List[MatchOut]:
    user = user_queries.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    matches = match_queries.get_matches_by_user(user_id)
    return matches


# >>>> SNYDER CHANGES COMMENTED OUT ABOVE <<<< ADDED CODE BELOW


# from fastapi import (
#     Body,
#     Depends,
#     HTTPException,
#     status,
#     Response,
#     APIRouter,
#     Request,
#     logger,
# )
# from jwtdown_fastapi.authentication import Token
# from authenticator import authenticator

# from pydantic import BaseModel

# from db.matches_db import MatchQueries, Match, MatchIn

# router = APIRouter()


# from fastapi import HTTPException, status


# @router.post("/matches/{logged_in_user}/{matched_user}")
# async def create_match(match: MatchIn, matches: MatchQueries = Depends()):
#     existing_match = matches.get_match(
#         logged_in_user=match.matched_user, matched_user=match.logged_in_user
#     )

#     if existing_match:
#         existing_match.mutual = True
#         updated_match = matches.update_match(existing_match)
#         return {"message": "Match updated to mutual.", "match": updated_match}

#     created_match = matches.create_match(match)
#     return {"message": "Match created.", "match": created_match}


# @router.get("/matches/{user_id}")
# async def get_matches_for_user(
#     user_id: int, matches: MatchQueries = Depends()
# ):
#     mutual_matches = matches.get_mutual_matches(user_id)
#     return {"matches": mutual_matches}


# @router.put("/matches/{logged_in_user}/{matched_user}")
# async def update_match(
#     logged_in_user: int, matched_user: int, matches: MatchQueries = Depends()
# ):
#     match = matches.get(logged_in_user, matched_user)
#     if match is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Match not found.",
#         )

#     match.mutual = True
#     updated_match = matches.update_match(match)

#     return {"message": "Match updated.", "match": updated_match}


# @router.get("/likes/{user_id}")
# async def get_likes_for_user(user_id: int, matches: MatchQueries = Depends()):
#     likes = matches.get_likes(user_id)
#     return {"likes": likes}


# @router.post("/likes/{logged_in_user}/{matched_user}")
# async def create_like(like: MatchIn, likes: MatchQueries = Depends()):
#     existing_like = likes.get_match(
#         logged_in_user=like.matched_user, matched_user=like.logged_in_user
#     )

#     # If there's an existing like from matched_user to logged_in_user, make it mutual
#     if existing_like:
#         existing_like.mutual = True
#         updated_like = likes.update_match(existing_like)
#         return {"message": "Like updated to mutual.", "like": updated_like}

#     # If there's no existing like, create a new one (not mutual)
#     created_like = likes.create_match(like)
#     return {"message": "Like created.", "like": created_like}


# @router.get("/matches")
# async def get_all_matches(matches: MatchQueries = Depends()):
#     all_matches = matches.get_all_matches()
#     return {"matches": all_matches}


# @router.get("/likes")
# async def get_all_likes(matches: MatchQueries = Depends()):
#     all_likes = matches.get_all_likes()
#     return {"likes": all_likes}
