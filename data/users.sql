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
    username TEXT NOT NULL,
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
    user2_id INT REFERENCES users(id)
);


-- CREATE ROLE superuser WITH LOGIN PASSWORD 'password' SUPERUSER;


INSERT INTO mbti_scores (score)
VALUES ('INTJ'), ('INTP'), ('ISTJ'), ('ENTP'),
        ('INFJ'), ('INFP'), ('ENFJ'), ('ENFP'),
        ('ISTJ'), ('ISFJ'), ('ESTJ'), ('ESFJ'),
        ('ISTP'), ('ISFP'), ('ESTP'), ('ESFP');


INSERT INTO interests (interest_name)
VALUES
('Traveling'),
('Outdoor activities ie. hiking, camping, etc.'),
('Fitness and sports'),
('Cooking and food'),
('Music (genres, playing instruments)'),
('Movies and TV shows'),
('Reading and literature'),
('Art and creativity'),
('Photography'),
('Gaming (video games, board games)'),
('Technology and gadgets'),
('Fashion and style'),
('Dancing'),
('Volunteer work and philanthropy'),
('Pets and animals'),
('Cars and motorcycles'),
('Nature and wildlife'),
('Yoga and meditation'),
('Writing and blogging'),
('Socializing and meeting new people'),
('Science and astronomy'),
('History and culture'),
('Fashion and style'),
('DIY projects and crafts'),
('Wine and cocktails');


INSERT INTO users (
    id,
    username,
    full_name,
    mbti_id,
    email,
    hashed_password,
    city,
    state
)
VALUES (1, 'jay', 'jay', 1, 'jay@jay.com', 'password', 'New York', 'NY'),
(2, 'melo', 'Mel', 2, 'mel@mel.com', 'password', 'Morristown', 'NJ');
