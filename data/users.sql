DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS potential_matches;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT UNIQUE NOT NULL,
    age INT NOT NULL,
    mbti TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    bio TEXT,
    zip_code VARCHAR(5) NOT NULL,
    interest TEXT,
    picture TEXT,
    matches_id INT,
    CONSTRAINT fk_matches
        FOREIGN KEY (matches_id)
        REFERENCES matches (id)
);

CREATE TABLE potential_matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    match_id INT NOT NULL,
    user_id INT NOT NULL,
    mbti_strength INT NOT NULL,
    liked BOOLEAN DEFAULT false,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_match
        FOREIGN KEY (match_id)
        REFERENCES matches (id),
    CONSTRAINT fk_user_match
        FOREIGN KEY (user_id)
        REFERENCES users (id)
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
    CONSTRAINT fk_logged_in_user
        FOREIGN KEY (logged_in_user)
        REFERENCES users (id)
);

-- -- Dummy data for users table
-- INSERT INTO users (username, full_name, mbti, email, hashed_password, age, bio, interest, picture, matches_id)
-- VALUES
--     ('user1', 'User One', 'INFP', 'user1@example.com', 'hashed_password1', 25, 'Bio for User One', 'Interest for User One', 'user1.jpg', 1),
--     ('user2', 'User Two', 'ENFP', 'user2@example.com', 'hashed_password2', 28, 'Bio for User Two', 'Interest for User Two', 'user2.jpg', 2),
--     ('user3', 'User Three', 'INFJ', 'user3@example.com', 'hashed_password3', 30, 'Bio for User Three', 'Interest for User Three', 'user3.jpg', 3);

-- -- Dummy data for matches table
-- INSERT INTO matches (user_id)
-- VALUES
--     (1), -- User One's matches
--     (2), -- User Two's matches
--     (3); -- User Three's matches

-- -- Dummy data for potential_matches table
-- INSERT INTO potential_matches (match_id, user_id, mbti_strength, liked)
-- VALUES
--     (1, 2, 4, true), -- User One's potential match 1 (User Two)
--     (1, 3, 5, false), -- User One's potential match 2 (User Three)
--     (2, 1, 3, true), -- User Two's potential match 1 (User One)
--     (2, 3, 4, true), -- User Two's potential match 2 (User Three)
--     (3, 1, 5, false), -- User Three's potential match 1 (User One)
--     (3, 2, 2, false); -- User Three's potential match 2 (User Two)
