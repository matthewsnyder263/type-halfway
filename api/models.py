from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    ForeignKey,
    MetaData,
)
from sqlalchemy.orm import Session

# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, declarative_base

engine = create_engine("postgresql://user:password@db:5432/data")

Base = declarative_base()

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)
# session = SessionLocal()


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    fullname = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    mbti = relationship("MBTI", backref="user")
    # mbti_id = Column(Integer, ForeignKey("mbti.id", ondelete="CASCADE"))
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)

    def __str__(self):
        return f"User(username={self.username},\
                fullname={self.fullname},\
                    email={self.email},\
                        hashed_password={self.hashed_password},\
                            city={self.city}, state={self.state},\
                                zip_code={self.zip_code}),\
                                    mbti={self.mbti})"


class Interests(Base):
    __tablename__ = "interests"

    id = Column(Integer, primary_key=True)
    interest_name = Column(String, unique=True)

    def __str__(self):
        return f"Interests(interest={self.interest})"


class UserInterests(Base):
    __tablename__ = "user_interests"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    interest_id = Column(Integer, ForeignKey("interests.id"))

    def __repr__(self):
        return f"UserInterests(user_id={self.user_id},\
                interest_id={self.interest_id})"


class MBTI(Base):
    __tablename__ = "mbti"

    id = Column(Integer, primary_key=True)
    mbti_type = Column(String, unique=True)
    users = relationship("User", backref="mbti")

    def __str__(self):
        return f"MBTI(mbti_type={self.mbti_type} users={self.users})"


class UserMBTI(Base):
    __tablename__ = "user_mbti"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    mbti_id = Column(Integer, ForeignKey("mbti.id"))

    def __str__(self):
        return f"UserMBTI(user_id={self.user_id},\
                mbti_id={self.mbti_id})"


class UserMatches(Base):
    __tablename__ = "user_matches"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    match_id = Column(Integer, ForeignKey("user.id"))
    distance = Column(Integer)

    def __str__(self):
        return f"UserMatches(user_id={self.user_id},\
                match_id={self.match_id})"


# Base.metadata.create_all(engine)
# new_user = User(
#     username="AA",
#     fullname="AA",
#     email="AA@AA.com",
#     # mbti_id=1,
#     hashed_password="AA",
#     city="AA",
#     state="AA",
#     zip_code="AA",
# )

# session.add(new_user)
# session.add()
# session.commit()

# session.query(User).all()
# for user in session.query(User).all():
#     print(user)
