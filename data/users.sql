DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS potential_matches;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    age INT NOT NULL,
    mbti TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    bio TEXT,
    zip_code VARCHAR(5) NOT NULL,
    interest TEXT,
    picture TEXT,
    matches_id INT
    -- CONSTRAINT fk_matches
    --     FOREIGN KEY (matches_id)
    --     REFERENCES matches (id)
);


CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);


ALTER TABLE users
    ADD CONSTRAINT fk_matches
        FOREIGN KEY (matches_id)
        REFERENCES matches (id);


CREATE TABLE potential_matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    match_id INT NOT NULL,
    matched_user INT NOT NULL,
    mbti_strength INT NOT NULL,
    liked BOOLEAN DEFAULT false,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_match
        FOREIGN KEY (match_id)
        REFERENCES matches (id),
    CONSTRAINT fk_matched_user
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);
