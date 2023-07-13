from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.schema import MetaData
from contextlib import contextmanager

engine = create_engine(
    "postgresql+psycopg2://user:password@db/data", echo="debug"
)

Base = declarative_base()

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)


@contextmanager
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
