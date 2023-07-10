-- DROP TABLE IF EXISTS matches;
-- DROP TABLE IF EXISTS user_interest;
DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS mbti_scores;
-- DROP TABLE IF EXISTS interests;


-- CREATE TABLE mbti_scores (
--     id SERIAL PRIMARY KEY,
--     score TEXT NOT NULL
-- );



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


-- CREATE TABLE interests (
--     id SERIAL PRIMARY KEY,
--     interest_name TEXT NOT NULL
-- );

-- CREATE TABLE user_interest (
--     user_id INT REFERENCES users(id),
--     interest_id INT REFERENCES interests(id),
--     PRIMARY KEY (user_id, interest_id)
-- );

-- CREATE TABLE matches (
--     id SERIAL PRIMARY KEY,
--     user1_id INT REFERENCES users(id),
--     user2_id INT REFERENCES users(id),
--         CONSTRAINT no_duplicate_matches CHECK (user1_id < user2_id)
-- )
