# from fastapi import (
#     Body,
#     Depends,
#     HTTPException,
#     status,
#     Response,
#     APIRouter,
#     Request,
# )

# from db.interests_db import (
#     InterestIn,
#     InterestOut,
#     InterestsOut,
#     InterestQueries,
# )


# router = APIRouter()


# @router.get("/api/interests", response_model=InterestsOut)
# def get_interests(interests: InterestQueries = Depends()):
#     return interests.get_interests()


# @router.post("/api/interests", response_model=InterestOut)
# def create_interest(data: InterestIn,
# interests: InterestQueries = Depends()):
#     return interests.create_interest(data)


# @router.delete("/api/interests/{interest_id}",
#  response_model=bool)
# def delete_interest(interest_id: int,
# interests: InterestQueries = Depends()):
#     interests.delete_interest(interest_id)
#     return True
