from fastapi import (
    Body,
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from db.user_db import UserOut, UserQueries

from db.interests_db import (
    InterestIn,
    InterestOut,
    InterestsOut,
    InterestQueries,
)


router = APIRouter()


@router.get("/api/interests", response_model=InterestsOut)
def get_interests(interests: InterestQueries = Depends()):
    return interests.get_interests()


@router.get("/api/users/{user_id}/interests", response_model=UserOut)
def get_user_by_id_with_interests(
    user_id: int,
    queries: UserQueries = Depends(),
):
    user = queries.get_user_with_interests(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user


@router.post("/api/interests", response_model=InterestOut)
def create_interest(data: InterestIn, interests: InterestQueries = Depends()):
    return interests.create_interest(data)


@router.delete("/api/interests/{interest_id}", response_model=bool)
def delete_interest(interest_id: int, interests: InterestQueries = Depends()):
    interests.delete_interest(interest_id)
    return True
