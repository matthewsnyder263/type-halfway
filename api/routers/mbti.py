# router.py
from fastapi import (
    Body,
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from db.mbti_db import (
    MbtisOut,
    MbtiQueries,
)

router = APIRouter()


@router.get("/api/mbti-options", response_model=MbtisOut)
def get_mbtis(mbtis: MbtiQueries = Depends()):
    return mbtis.get_mbtis()
