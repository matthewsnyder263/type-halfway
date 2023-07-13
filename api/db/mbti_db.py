from models import MBTI
from db_config import SessionLocal
from fastapi import Depends
from sqlalchemy.orm import Session


class MBTIQueries:
    def __init__(self, db: Session = Depends(SessionLocal)):
        self.db = db

    def get_mbti(self, mbti_id: int) -> MBTI:
        mbti = self.db.query(MBTI).filter(MBTI.id == mbti_id).first()
        return mbti

    def create_mbti(self, data: MBTI):
        new_mbti = MBTI(**data.dict())
        self.db.add(new_mbti)
        self.db.commit()
        self.db.refresh(new_mbti)
        return new_mbti

    def delete_mbti(self, mbti_id: int):
        mbti = self.db.query(MBTI).filter(MBTI.id == mbti_id).first()
        self.db.delete(mbti)
        self.db.commit()
        return mbti


db = SessionLocal()

mbti_1 = MBTI(mbti_type="INTJ")
mbti_2 = MBTI(mbti_type="INTP")
mbti_3 = MBTI(mbti_type="ENTJ")
mbti_4 = MBTI(mbti_type="ENTP")
mbti_5 = MBTI(mbti_type="INFJ")
mbti_6 = MBTI(mbti_type="INFP")
mbti_7 = MBTI(mbti_type="ENFJ")
mbti_8 = MBTI(mbti_type="ENFP")
mbti_9 = MBTI(mbti_type="ISTJ")
mbti_10 = MBTI(mbti_type="ISFJ")
mbti_11 = MBTI(mbti_type="ESTJ")
mbti_12 = MBTI(mbti_type="ESFJ")
mbti_13 = MBTI(mbti_type="ISTP")
mbti_14 = MBTI(mbti_type="ISFP")
mbti_15 = MBTI(mbti_type="ESTP")
mbti_16 = MBTI(mbti_type="ESFP")

db.add(mbti_1)
db.add(mbti_2)
db.add(mbti_3)
db.add(mbti_4)
db.add(mbti_5)
db.add(mbti_6)
db.add(mbti_7)
db.add(mbti_8)
db.add(mbti_9)
db.add(mbti_10)
db.add(mbti_11)
db.add(mbti_12)
db.add(mbti_13)
db.add(mbti_14)
db.add(mbti_15)
db.add(mbti_16)
db.commit()
db.close()
