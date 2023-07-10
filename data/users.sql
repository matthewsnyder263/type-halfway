DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS user_interest;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS mbti_scores;
DROP TABLE IF EXISTS interests;


CREATE TABLE mbti_scores (
    id SERIAL PRIMARY KEY,
    score TEXT NOT NULL
);



CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    mbti_id INT REFERENCES mbti_scores(id),
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL
);


CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL
);

CREATE TABLE user_interest (
    user_id INT REFERENCES users(id),
    interest_id INT REFERENCES interests(id),
    PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES users(id),
    user2_id INT REFERENCES users(id),
    CONSTRAINT no_duplicate_matches CHECK (user1_id < user2_id)
);


INSERT INTO interests VALUES
(1, 'Traveling'),
(2, 'Hiking/Camping'),
(3, 'Playing Musical Instruments'),
(4, 'Sailing'),
(5, 'Photography'),
(6, 'Singing'),
(7, 'Fitness'),
(8, 'Dogs'),
(9, 'Cats'),
(10, 'Yoga'),
(11, 'Reading'),
(12, 'Surfing'),
(13, 'Rock Climbing'),
(14, 'Skiing/Snowboarding'),
(15, 'Sky Diving'),
(16, 'Cooking')
;


INSERT INTO mbti_scores VALUES
(1, 'INFP'),
(2, 'ENFP'),
(3, 'ESTJ'),
(4, 'INFJ'),
(5, 'ENFJ'),
(6, 'INTJ'),
(7, 'ENTJ'),
(8, 'INTP'),
(9, 'ENTP'),
(10, 'ISFP'),
(11, 'ESFP'),
(12, 'ISTP'),
(13, 'ESTP'),
(14, 'ISFJ'),
(15, 'ESFJ'),
(16, 'ISTJ')
;
