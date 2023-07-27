from fastapi import (
    APIRouter,
    Depends,
)

from ..db.gender_db import GenderOut, GenderQueries

router = APIRouter()


@router.get("/api/genders", response_model=(GenderOut))
async def get_genders(queries: GenderQueries = Depends()):
    genders = queries.get()
    return {"genders": genders}
