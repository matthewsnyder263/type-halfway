from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
)
from db_config import Base  # , engine
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    fullname = Column(String)
    email = Column(String, unique=True)
    gender = relationship("Gender", back_populates="user", uselist=False)
    age = Column(Integer)
    mbti = relationship("MBTI", backref="user")
    hashed_password = Column(String)
    bio = Column(String)
    mbti_id = Column(Integer, ForeignKey("mbti.id"))
    zip_code = Column(String)
    picture = Column(String)
    interest = relationship(
        "Interest", secondary="user_interest", back_populates="user"
    )

    def __str__(self):
        return f"User(username={self.username},\
                fullname={self.fullname},\
                    email={self.email},\
                        hashed_password={self.hashed_password},\
                            city={self.city}, state={self.state},\
                                zip_code={self.zip_code}),\
                                    mbti={self.mbti})"


class Gender(Base):
    __tablename__ = "gender"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    user_id = Column(Integer, ForeignKey("user.id"))


# class Interests(Base):
#     __tablename__ = "interests"

#     id = Column(Integer, primary_key=True)
#     interest_name = Column(String, unique=True)

#     def __str__(self):
#         return f"Interests(interest={self.interest})"


# class UserInterests(Base):
#     __tablename__ = "user_interests"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     interest_id = Column(Integer, ForeignKey("interests.id"))

#     def __repr__(self):
#         return f"UserInterests(user_id={self.user_id},\
#                 interest_id={self.interest_id})"


# class MBTI(Base):
#     __tablename__ = "mbti"

#     id = Column(Integer, primary_key=True)
#     mbti_type = Column(String, unique=True)
#     users_mbti = relationship("User", backref="user")

#     def __str__(self):
#         return f"MBTI(mbti_type={self.mbti_type})"  # users={self.users})"


# class UserMBTI(Base):
#     __tablename__ = "user_mbti"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     mbti_id = Column(Integer, ForeignKey("mbti.id"))

#     def __str__(self):
#         return f"UserMBTI(user_id={self.user_id},\
#                 mbti_id={self.mbti_id})"


# class UserMatches(Base):
#     __tablename__ = "user_matches"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     match_id = Column(Integer, ForeignKey("user.id"))
#     distance = Column(Integer)

#     def __str__(self):
#         return f"UserMatches(user_id={self.user_id},\
#                 match_id={self.match_id})"


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
