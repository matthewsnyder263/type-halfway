from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from db.matches_db import MatchQueries, MatchIn

router = APIRouter()


@router.post("/matches/{match_id}")
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


@router.get("/users/{user_id}/matches")
async def get_matches_for_user(
    user_id: int, matches: MatchQueries = Depends()
):
    mutual_matches = matches.get_mutual_matches(user_id)
    return {"matches": mutual_matches}


@router.put("/matches/{match_id}")
async def update_match(
    match_id: int, match: MatchIn, matches: MatchQueries = Depends()
):
    existing_match = matches.get_match_by_id(match_id)
    if existing_match is None:
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

    if existing_like:
        existing_like.mutual = True
        updated_like = likes.update_match(existing_like)
        return {"message": "Like updated to mutual.", "like": updated_like}

    created_like = likes.create_match(like)
    return {"message": "Like created.", "like": created_like}


@router.get("/matches")
async def get_all_matches(matches: MatchQueries = Depends()):
    all_matches = matches.get_all_matches()
    return {"matches": all_matches}


@router.get("/matches/{match_id}")
async def get_match(match_id: int, matches: MatchQueries = Depends()):
    match = matches.get_match_by_id(match_id)
    if match is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found.",
        )
    return match


@router.delete("/matches/{match_id}")
async def delete_match(match_id: int, matches: MatchQueries = Depends()):
    match = matches.delete_match(match_id)
    if match is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match couldn't be found.",
        )
    return match


@router.get("/likes")
async def get_all_likes(matches: MatchQueries = Depends()):
    all_likes = matches.get_all_likes()
    return {"likes": all_likes}
