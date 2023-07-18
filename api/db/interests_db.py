# from pydantic import BaseModel
# from typing import List
# from .models import Interests
# from .db_config import get_db
# from sqlalchemy.orm import Session
# from fastapi import Depends


# class Error(BaseModel):
#     message: str


# class InterestDB(BaseModel):
#     id: int
#     interest_name: str


# class InterestIn(BaseModel):
#     interest_name: str


# class InterestOut(BaseModel):
#     id: int
#     interest_name: str


# class InterestsOut(BaseModel):
#     interests: List[InterestOut]


# class InterestQueries:
#     def __init__(self, db: Session = Depends(get_db)):
#         self.db = db

#     def get_interest(self, interest_id: int) -> InterestDB:
#         interest = (
#             self.db.query(Interests)
#             .filter(Interests.id == interest_id)
#             .first()
#         )
#         return interest

#     def create_interest(self, data: InterestIn):
#         new_interest = InterestIn(**data.dict())
#         self.db.add(new_interest)
#         self.db.commit()
#         self.db.refresh(new_interest)
#         return new_interest

#     def delete_interest(self, interest_id: int):
#         interest = (
#             self.db.query(Interests)
#             .filter(Interests.id == interest_id)
#             .first()
#         )
#         self.db.delete(interest)
#         self.db.commit()
#         return interest
