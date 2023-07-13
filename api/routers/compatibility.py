from fastapi import APIRouter, Depends
from typing import List

from db.compatibility_db import CompatibilityQueries, CompatibilityOut


router = APIRouter()

compatibility_queries = CompatibilityQueries


@router.get("/compatibility/{user_id}", response_model=List[CompatibilityOut])
def get_compatibility_by_user_id(
    user_id: int,
    queries: CompatibilityQueries = Depends()
    ):
    compatibilities = queries.get_compatibility_by_user_id(user_id)
    return compatibilities


@router.post("/compatibility/{user_id}/calculate")
def calculate_and_save_compatibility(
    user_id: int,
    queries: CompatibilityQueries = Depends()
    ):
    queries.calculate_and_save_compatibility(user_id)
    return {"message": "Compatibility calculation completed."}
