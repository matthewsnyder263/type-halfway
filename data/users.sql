DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS matches;
-- DROP TABLE IF EXISTS potential_matches;
DROP TABLE IF EXISTS genders;
DROP TABLE IF EXISTS interests;


CREATE TABLE genders(
    id SERIAL PRIMARY KEY,
    gender TEXT NOT NULL
);

CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender INT REFERENCES genders(id),
    age INT NOT NULL,
    mbti TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    bio TEXT,
    zip_code VARCHAR(5) NOT NULL,
    interest TEXT,
    picture TEXT
    -- matches_id INT
    -- CONSTRAINT fk_matches
    --     FOREIGN KEY (matches_id)
    --     REFERENCES matches (id)
);

CREATE TABLE user_interests (
    user_id INT REFERENCES users(id),
    interest_id INT REFERENCES interests(id),
    PRIMARY KEY (user_id, interest_id)
);


-- CREATE TABLE matches (
--     id SERIAL PRIMARY KEY,
--     logged_in_user INT NOT NULL,
--     user_id INT NOT NULL,
--     CONSTRAINT fk_user
--         FOREIGN KEY (user_id)
--         REFERENCES users (id),
--     CONSTRAINT fk_logged_in_user
--         FOREIGN KEY (logged_in_user)
--         REFERENCES users (id)
-- );


-- ALTER TABLE users
--     ADD CONSTRAINT fk_matches
--         FOREIGN KEY (matches_id)
--         REFERENCES matches (id);


-- CREATE TABLE potential_matches (
--     id SERIAL PRIMARY KEY,
--     logged_in_user INT NOT NULL,
--     match_id INT NOT NULL,
--     matched_user INT NOT NULL,
--     mbti_strength INT NOT NULL,
--     liked BOOLEAN DEFAULT false,
--     created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_match
--         FOREIGN KEY (match_id)
--         REFERENCES matches (id),
--     CONSTRAINT fk_matched_user
--         FOREIGN KEY (user_id)
--         REFERENCES users (id),
--     CONSTRAINT fk_logged_in_user
--         FOREIGN KEY (logged_in_user)
--         REFERENCES users (id)
-- );




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


INSERT INTO genders (gender)
VALUES
('Male'),
('Female'),
('Non-binary'),
('Other'),
('Prefer not to say');
