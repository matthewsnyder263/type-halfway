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

from db.matches_db import MatchQueries, Match

router = APIRouter()


from fastapi import HTTPException, status

# create get_match


# basically this logic ensures that theres no duplicate likes which may cause errors down line
# if user1_id is 100 and user2_id is 50 and 100 likes 50, it will be read
# 50 is liked by 100 b/c we could have two instances
@router.post("/matches/{user1_id}/{user2_id}")
async def create_match(
    user1_id: int, user2_id: int, matches: MatchQueries = Depends()
):
    if user1_id == user2_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User1_id must not be the same as User2_id.",
        )

    # Ensure user1_id is always less than user2_id to avoid duplicate matches
    if user1_id > user2_id:
        user1_id, user2_id = user2_id, user1_id

    # Check if match already exists
    existing_match = matches.get_match(user1_id, user2_id)
    if existing_match:
        # If match exists and isn't mutual yet, update it to be mutual
        if not existing_match.mutual:
            existing_match.mutual = True
            matches.update_match(existing_match)
            return {"message": "Match is now mutual.", "match": existing_match}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A mutual match already exists between these users.",
            )

    # If match doesn't exist, create a new non-mutual match
    new_match = Match(user1_id=user1_id, user2_id=user2_id, mutual=False)
    created_match = matches.create_match(new_match)
    return {"message": "Match created.", "match": created_match}


#matching in this case is always a 1 way street, user1_id will always like user2_id
@router.post("/matches/{user1_id}/{user2_id}")
async def create_match(
    user1_id: int, user2_id: int, matches: MatchQueries = Depends()
):
    # Check if there is a record of user2 liking user1
    existing_match = matches.get_match(user1_id=user2_id, user2_id=user1_id)

    if existing_match:
        # If the match exists, update it to indicate that the like is now mutual
        existing_match.mutual = True
        updated_match = matches.update_match(existing_match)
        return {"message": "Match updated to mutual.", "match": updated_match}

    # If there's no existing match, create a new one
    new_match = Match(user1_id=user1_id, user2_id=user2_id, mutual=False)
    created_match = matches.create_match(new_match)
    return {"message": "Match created.", "match": created_match}




@router.get("/matches/{user_id}")
async def get_matches_for_user(user_id: int, matches: MatchQueries = Depends()):
    mutual_matches = matches.get_mutual_matches_for_user(user_id)
    return {"matches": mutual_matches}






@router.put("/matches/{user1_id}/{user2_id}")
async def update_match(
    user1_id: int, user2_id: int, matches: MatchQueries = Depends()
):
    match = matches.get(user1_id, user2_id)
    if match is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found.",
        )

    match.mutual = True
    updated_match = matches.update_match(match)

    return {"message": "Match updated.", "match": updated_match}
