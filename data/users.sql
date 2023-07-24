DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS mbtis;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS potential_matches;



CREATE TABLE mbtis (
    id SERIAL PRIMARY KEY,
    score TEXT NOT NULL
);

-- DROP TABLE IF EXISTS matches;
-- DROP TABLE IF EXISTS potential_matches;
DROP TABLE IF EXISTS genders;
DROP TABLE IF EXISTS interests;


-- CREATE TABLE genders(
--     id SERIAL PRIMARY KEY,
--     gender TEXT NOT NULL
-- );

CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    gender TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    mbti_id INT REFERENCES mbtis(id),
    email TEXT UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    age VARCHAR(3) NOT NULL,
    mbti TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    bio TEXT,
    interests TEXT[],
    picture TEXT,
    zipcode VARCHAR(5)
    zip_code VARCHAR(5) NOT NULL,
    interest TEXT,
    picture TEXT
    -- matches_id INT
    -- CONSTRAINT fk_matches
    --     FOREIGN KEY (matches_id)
    --     REFERENCES matches (id)
);


-- CREATE TABLE interests (
--     id SERIAL PRIMARY KEY,
--     interest_name TEXT NOT NULL
-- );

-- CREATE TABLE user_interest (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, interest_id)
-- );

CREATE TABLE matches (
id SERIAL PRIMARY KEY,
logged_in_user INT REFERENCES users(id),
matched_user INT REFERENCES users(id),
mutual BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE compatibility (
    id SERIAL PRIMARY KEY,
    user_id_1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 INT REFERENCES users(id) ON DELETE CASCADE,
    strength FLOAT NOT NULL
);



CREATE TABLE potential_matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    match_id INT DEFAULT NULL,
    matched_user INT NOT NULL,
    mbti_strength INT NOT NULL,
    liked BOOLEAN DEFAULT false,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_match
        FOREIGN KEY (match_id)
        REFERENCES matches (id),
    CONSTRAINT fk_matched_user
        FOREIGN KEY (matched_user)
        REFERENCES users (id),
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);


INSERT INTO mbtis VALUES
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



-- INSERT INTO users (gender, username, full_name, mbti_id, email, hashed_password, age, bio, interests, picture, zipcode) VALUES
-- ('Male', 'Msnyd', 'Matt Snyder', 1, 'msnyd87@gmail.com', 'password', 55, 'I got sunshine on a cloudy day', 'Jumping, Running, Long Walks on the Pier', 'https://www.surfertoday.com/images/stories/pointbreakmovie.jpg', '58216'),
-- ('Female', '1', '1', 1, '1@gmail.com', '1', 1, 'Bio Here', 'Hobbies here', 'https://www.printableparadise.com/numbers/printable-number-1-silhouette.png', '20839'),
-- ('Male', 'Mr.Freeman', 'Morgan Freeman', 1, 'morgan@gmail.com', 'password', 63, 'I can narrate you to sleep', 'Hobbies here2', 'https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg', '48102');

INSERT INTO users (gender, username, full_name, mbti_id, email, hashed_password, age, bio, interests, picture, zipcode) VALUES
    ('Male', 'Msnyd', 'Matt Snyder', 1, 'msnyd87@gmail.com', 'password', 55, 'I got sunshine on a cloudy day', '{Jumping, Running, "Long Walks on the Pier"}', 'https://www.surfertoday.com/images/stories/pointbreakmovie.jpg', '58216'),
    ('Female', '1', '1', 1, '1@gmail.com', '1', 1, 'Bio Here', '{Hobbies here}', 'https://www.printableparadise.com/numbers/printable-number-1-silhouette.png', '20839'),
    ('Male', 'Mr.Freeman', 'Morgan Freeman', 1, 'morgan@gmail.com', 'password', 63, 'I can narrate you to sleep', '{Hobbies here2}', 'https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg', '48102');


-- INSERT INTO users VALUES
-- (1, 'Male', 'Msnyd', 'Matt Snyder', '1', 'msnyd87@gmail.com', 'password', 55, 'I got sunshine on a cloudy day', 'Jumping, Running, Long Walks on the Pier', 'https://www.surfertoday.com/images/stories/pointbreakmovie.jpg', '58216'),
-- (2, 'Female', '1', '1', '1', '1@gmail.com', '1', 1, 'Bio Here', 'Hobbies here', 'https://www.printableparadise.com/numbers/printable-number-1-silhouette.png', '20839'),
-- (3, 'Male', 'Mr.Freeman', 'Morgan Freeman', '1', 'morgan@gmail.com', 'password', 63, 'I can narrate you to sleep', 'Hobbies here2', 'https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg', '48102')
-- ;



ALTER TABLE users
    ADD CONSTRAINT fk_matches
        FOREIGN KEY (matches_id)
        REFERENCES matches (id);


-- INSERT INTO user_interest VALUES (1, 1), (1, 2);

-- INSERT INTO matches VALUES
--     (1, 1, 2, false),
--     (2, 2, 3, false);



























-- DROP TABLE IF EXISTS matches;
-- DROP TABLE IF EXISTS user_interest;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS mbtis;
-- DROP TABLE IF EXISTS interests;
-- DROP TABLE IF EXISTS matches;



-- CREATE TABLE mbtis (
--     id SERIAL PRIMARY KEY,
--     score TEXT NOT NULL
-- );



-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     gender TEXT NOT NULL,
--     username TEXT UNIQUE NOT NULL,
--     full_name TEXT NOT NULL,
--     mbti_id INT REFERENCES mbtis(id),
--     email TEXT UNIQUE NOT NULL,
--     hashed_password TEXT NOT NULL,
--     age INT NOT NULL,
--     bio TEXT,
--     interests TEXT,
--     picture TEXT,
--     zipcode VARCHAR(5)
-- );


-- -- CREATE TABLE interests (
-- --     id SERIAL PRIMARY KEY,
-- --     interest_name TEXT NOT NULL
-- -- );


-- -- CREATE TABLE user_interest (
-- --     user_id INT REFERENCES users(id) ON DELETE CASCADE,
-- --     interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
-- --     PRIMARY KEY (user_id, interest_id)
-- -- );


-- CREATE TABLE matches (
--     id SERIAL PRIMARY KEY,
--     user1_id INT REFERENCES users(id),
--     user2_id INT REFERENCES users(id),
--     mutual BOOLEAN NOT NULL DEFAULT FALSE
-- );


-- CREATE TABLE compatibility (
--     id SERIAL PRIMARY KEY,
--     user_id_1 INT REFERENCES users(id) ON DELETE CASCADE,
--     user_id_2 INT REFERENCES users(id) ON DELETE CASCADE,
--     strength FLOAT NOT NULL
-- );


-- INSERT INTO mbtis VALUES
-- (1, 'INFP'),
-- (2, 'ENFP'),
-- (3, 'ESTJ'),
-- (4, 'INFJ'),
-- (5, 'ENFJ'),
-- (6, 'INTJ'),
-- (7, 'ENTJ'),
-- (8, 'INTP'),
-- (9, 'ENTP'),
-- (10, 'ISFP'),
-- (11, 'ESFP'),
-- (12, 'ISTP'),
-- (13, 'ESTP'),
-- (14, 'ISFJ'),
-- (15, 'ESFJ'),
-- (16, 'ISTJ')
-- ;



-- INSERT INTO users VALUES
-- (1, 'Male', 'matt', 'Matt Snyder', '1', 'msnyd87@gmail.com', 'password', 55, 'I got sunshine on a cloudy day', 'Walking, Talking, Eating', 'https://www.surfertoday.com/images/stories/pointbreakmovie.jpg', '58216'),
-- (2, 'Female', '1', '1', '3', '1@gmail.com', '1', 1, 'Bio Here', 'Hobbies Here2', 'https://www.printableparadise.com/numbers/printable-number-1-silhouette.png', '20839'),
-- (3, 'Male', 'freeman', 'Morgan Freeman', '7', 'morgan@gmail.com', 'password', 63, 'I can narrate you to sleep', 'Hobbies Here3', 'https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg', '48102')
-- ;


-- -- INSERT INTO interests VALUES
-- -- (1, 'Traveling'),
-- -- (2, 'Hiking/Camping'),
-- -- (3, 'Playing Musical Instruments'),
-- -- (4, 'Sailing'),
-- -- (5, 'Photography'),
-- -- (6, 'Singing'),
-- -- (7, 'Fitness'),
-- -- (8, 'Dogs'),
-- -- (9, 'Cats'),
-- -- (10, 'Yoga'),
-- -- (11, 'Reading'),
-- -- (12, 'Surfing'),
-- -- (13, 'Rock Climbing'),
-- -- (14, 'Skiing/Snowboarding'),
-- -- (15, 'Sky Diving'),
-- -- (16, 'Cooking')
-- -- ;



-- -- INSERT INTO user_interest VALUES (1, 1), (1, 2);


-- -- INSERT INTO matches VALUES
-- --     (1, 1, 2, false),
-- --     (2, 2, 3, false);
CREATE TABLE potential_matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    match_id INT DEFAULT NULL,
    matched_user INT NOT NULL,
    mbti_strength INT NOT NULL,
    liked BOOLEAN DEFAULT false,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_match
        FOREIGN KEY (match_id)
        REFERENCES matches (id),
    CONSTRAINT fk_matched_user
        FOREIGN KEY (matched_user)
        REFERENCES users (id),
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);
