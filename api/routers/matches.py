from fastapi import (
    Body,
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
    logger,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from db.matches_db import MatchQueries, Match, MatchIn

router = APIRouter()


from fastapi import HTTPException, status

# create get_match


# basically this logic ensures that theres no duplicate likes which may cause errors down line
# if logged_in_user is 100 and matched_user is 50 and 100 likes 50, it will be read
# 50 is liked by 100 b/c we could have two instances
# @router.post("/matches/{logged_in_user}/{matched_user}")
# async def create_match(
#     logged_in_user: int, matched_user: int, matches: MatchQueries = Depends()
# ):
#     if logged_in_user == matched_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="logged_in_user must not be the same as matched_user.",
#         )

#     # Ensure logged_in_user is always less than matched_user to avoid duplicate matches
#     if logged_in_user > matched_user:
#         logged_in_user, matched_user = matched_user, logged_in_user

#     # Check if match already exists
#     existing_match = matches.get_match(logged_in_user, matched_user)
#     if existing_match:
#         # If match exists and isn't mutual yet, update it to be mutual
#         if not existing_match.mutual:
#             existing_match.mutual = True
#             matches.update_match(existing_match)
#             return {"message": "Match is now mutual.", "match": existing_match}
#         else:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="A mutual match already exists between these users.",
#             )

#     # If match doesn't exist, create a new non-mutual match
#     new_match = Match(logged_in_user=logged_in_user, matched_user=matched_user, mutual=False)
#     created_match = matches.create_match(new_match)
#     return {"message": "Match created.", "match": created_match}


# @router.post("/matches/{logged_in_user}/{matched_user}")
# async def create_match(
#     logged_in_user: int, matched_user: int, matches: MatchQueries = Depends()
# ):
#     existing_match = matches.get_match(logged_in_user=matched_user, matched_user=logged_in_user)

#     if existing_match:
#         existing_match.mutual = True
#         updated_match = matches.update_match(existing_match)
#         return {"message": "Match updated to mutual.", "match": updated_match}

#     new_match = Match(logged_in_user=logged_in_user, matched_user=matched_user, mutual=False)
#     created_match = matches.create_match(new_match)
#     return {"message": "Match created.", "match": created_match}


@router.post("/matches/{logged_in_user}/{matched_user}")
async def create_match(match: MatchIn, matches: MatchQueries = Depends()):
    existing_match = matches.get_match(
        logged_in_user=match.matched_user, matched_user=match.logged_in_user
    )

    if existing_match:
        existing_match.mutual = True
        updated_match = matches.update_match(existing_match)
        return {"message": "Match updated to mutual.", "match": updated_match}

    created_match = matches.create_match(match)
    return {"message": "Match created.", "match": created_match}


@router.get("/matches/{user_id}")
async def get_matches_for_user(
    user_id: int, matches: MatchQueries = Depends()
):
    mutual_matches = matches.get_mutual_matches(user_id)
    return {"matches": mutual_matches}


@router.put("/matches/{logged_in_user}/{matched_user}")
async def update_match(
    logged_in_user: int, matched_user: int, matches: MatchQueries = Depends()
):
    match = matches.get(logged_in_user, matched_user)
    if match is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found.",
        )

    match.mutual = True
    updated_match = matches.update_match(match)

    return {"message": "Match updated.", "match": updated_match}


@router.get("/likes/{user_id}")
async def get_likes_for_user(user_id: int, matches: MatchQueries = Depends()):
    likes = matches.get_likes(user_id)
    return {"likes": likes}


@router.post("/likes/{logged_in_user}/{matched_user}")
async def create_like(like: MatchIn, likes: MatchQueries = Depends()):
    existing_like = likes.get_match(
        logged_in_user=like.matched_user, matched_user=like.logged_in_user
    )

    # If there's an existing like from matched_user to logged_in_user, make it mutual
    if existing_like:
        existing_like.mutual = True
        updated_like = likes.update_match(existing_like)
        return {"message": "Like updated to mutual.", "like": updated_like}

    # If there's no existing like, create a new one (not mutual)
    created_like = likes.create_match(like)
    return {"message": "Like created.", "like": created_like}


@router.get("/matches")
async def get_all_matches(matches: MatchQueries = Depends()):
    all_matches = matches.get_all_matches()
    return {"matches": all_matches}


@router.get("/likes")
async def get_all_likes(matches: MatchQueries = Depends()):
    all_likes = matches.get_all_likes()
    return {"likes": all_likes}
