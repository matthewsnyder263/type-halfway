DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS potential_matches;
DROP TABLE IF EXISTS compatibility;


CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    age VARCHAR(3) NOT NULL,
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



CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    logged_in_user INT REFERENCES users(id),
    matched_user INT REFERENCES users(id),
    mutual BOOLEAN NOT NULL DEFAULT FALSE,
    match_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE matches
ADD CONSTRAINT user_cannot_match_self
CHECK (logged_in_user <> matched_user);



-- added match_timestamp, will timestamp when mutual = true

CREATE OR REPLACE FUNCTION update_match_timestamp() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.mutual THEN
        NEW.match_timestamp = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_match_timestamp_trigger
BEFORE UPDATE ON matches
FOR EACH ROW
EXECUTE PROCEDURE update_match_timestamp();





CREATE TABLE compatibility (
    id SERIAL PRIMARY KEY,
    user_id_1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 INT REFERENCES users(id) ON DELETE CASCADE,
    strength FLOAT NOT NULL
);

-- ALTER TABLE users
--     ADD CONSTRAINT fk_matches
--         FOREIGN KEY (matches_id)
--         REFERENCES matches (id);


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




-- Populate interests
INSERT INTO interests (interest_name) VALUES
    ('Skiing'),
    ('Photography'),
    ('Cooking'),
    ('Hiking'),
    ('Gaming'),
    ('Reading'),
    ('Gardening'),
    ('Cycling'),
    ('Baking'),
    ('Writing');


-- Populate users
INSERT INTO users (username, full_name, email, gender, age, mbti, hashed_password, bio, zip_code, interest, picture) VALUES
    ('Darla', 'Sara Kareen', 'user1@example.com', 'Female', '22', 'INTJ', 'hashedpassword1', 'Bio for User One', '90210', 'Skiing', 'https://newprofilepic.com/assets/images/article/28_img.png'),
    ('Kim', 'Kimela Kardie', 'user2@example.com', 'Female', '23', 'ENTP', 'hashedpassword2', 'Bio for User Two', '90211', 'Photography', 'https://i.guim.co.uk/img/media/3fd9298d169911455a23b5d84567266e0c5a4d83/0_0_3400_2370/master/3400.jpg?width=1140&dpr=1&s=none'),
    ('Hog', 'Billy Bob', 'user3@example.com', 'Male', '24', 'INFJ', 'hashedpassword3', 'Bio for User Three', '90212', 'Cooking', 'https://img.freepik.com/premium-photo/modern-businesswoman-office-smiling-female-boss-posing-company-photograph-self-assured-successful-woman-work_28914-3436.jpg?w=996'),
    ('Princess', 'Karen Sheik', 'user4@example.com', 'Female', '25', 'ENFJ', 'hashedpassword4', 'Bio for User Four', '90213', 'Hiking', 'https://img.freepik.com/premium-photo/sensual-woman-glasses-skincare-elegant-fashion-model-fashion-beauty-makeup-cosmetic-pretty-girl-with-sexy-look-girl-with-perfect-face-skin-trendy-makeup-sexy-smart-woman-businesslady_265223-26116.jpg?w=996'),
    ('Trish', 'Amy Swartz', 'user5@example.com', 'Female', '26', 'INFP', 'hashedpassword5', 'Bio for User Five', '90214', 'Gaming', 'https://i.pinimg.com/originals/0f/98/d6/0f98d6b41ec97558a901af4186119b81.jpg'),
    ('Mikey', 'Matt Damon', 'user6@example.com', 'Male', '27', 'INTP', 'hashedpassword6', 'Bio for User Six', '90215', 'Reading', 'https://image.adsoftheworld.com/vpyxhpfkqy1hevyak4r0pqxzjhxm'),
    ('Jimmy2Fingas', 'Benjamin Button', 'user7@example.com', 'Male', '28', 'ENTJ', 'hashedpassword7', 'Bio for User Seven', '90216', 'Gardening', 'https://www.denverpost.com/wp-content/uploads/2016/04/20130812__b82c2ac8-a47f-40f5-890b-60c98e05c214p1.jpg?w=767'),
    ('Mrs.Sassy', 'Rebecca Ross', 'user8@example.com', 'Female', '29', 'ENFP', 'hashedpassword8', 'Bio for User Eight', '90217', 'Cycling', 'https://psmag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ2NTk2MjQ0NDI0NzYzMjU1/6f430-1ka9wp129tz1jyk79ujrqwa.jpg'),
    ('Fridgerator', 'Ted Nugent', 'user9@example.com', 'Male', '30', 'INFJ', 'hashedpassword9', 'Bio for User Nine', '90218', 'Baking', 'https://hips.hearstapps.com/hmg-prod/images/brad-pitt-attends-sony-pictures-once-upon-a-time-in-news-photo-1163685599-1564157148.jpg?crop=0.539xw:1.00xh;0.236xw,0&resize=1200:*'),
    ('SweetSally', 'Rianna Rose', 'user10@example.com', 'Female', '31', 'INFP', 'hashedpassword10', 'Bio for User Ten', '90219', 'Writing', 'https://i.pinimg.com/564x/c6/f5/32/c6f532ce0be5c5e8a45aad0330b0d5e8.jpg');



-- Populate matches with some mutual matches and some non-mutual match
INSERT INTO matches (logged_in_user, matched_user, mutual) VALUES
    (1, 2, true),  -- Mutual match between user1 and user2
    (2, 3, true),  -- Mutual match between user2 and user3
    (3, 4, true),  -- Mutual match between user3 and user4
    (4, 5, true),  -- Mutual match between user4 and user5
    (5, 6, true),  -- Mutual match between user5 and user6
    (6, 7, true),  -- Mutual match between user6 and user7
    (7, 8, true),  -- Mutual match between user7 and user8
    (8, 9, true),  -- Mutual match between user8 and user9
    (9, 10, true), -- Mutual match between user9 and user10
    (1, 3, false), -- Non-mutual match (only user1 liked user3)
    (2, 4, false), -- Non-mutual match (only user2 liked user4)
    (3, 5, false); -- Non-mutual match (only user3 liked user5)

-- Populate potential_matches with similar data as matches
INSERT INTO potential_matches (logged_in_user, match_id, matched_user, mbti_strength, liked) VALUES
    (1, 1, 2, 90, true),
    (2, 1, 1, 90, true),
    (2, 2, 3, 85, true),
    (3, 2, 2, 85, true),
    (3, 3, 4, 80, true),
    (4, 3, 3, 80, true),
    (4, 4, 5, 75, true),
    (5, 4, 4, 75, true),
    (5, 5, 6, 70, true),
    (6, 5, 5, 70, true),
    (6, 6, 7, 65, true),
    (7, 6, 6, 65, true),
    (7, 7, 8, 60, true),
    (8, 7, 7, 60, true),
    (8, 8, 9, 55, true),
    (9, 8, 8, 55, true),
    (9, 9, 10, 50, true),
    (10, 9, 9, 50, true),
    (1, 10, 3, 95, true),
    (2, 11, 4, 90, true),
    (3, 12, 5, 85, true);

-- Populate compatibility table with random data
INSERT INTO compatibility (user_id_1, user_id_2, strength) VALUES
    (1, 2, 0.9),
    (2, 3, 0.85),
    (3, 4, 0.8),
    (4, 5, 0.75),
    (5, 6, 0.7),
    (6, 7, 0.65),
    (7, 8, 0.6),
    (8, 9, 0.55),
    (9, 10, 0.5),
    (1, 3, 0.95),
    (2, 4, 0.90),
    (3, 5, 0.85),
    (4, 6, 0.80),
    (5, 7, 0.75),
    (6, 8, 0.70),
    (7, 9, 0.65),
    (8, 10, 0.60),
    (1, 4, 0.95),
    (2, 5, 0.90),
    (3, 6, 0.85),
    (4, 7, 0.80),
    (5, 8, 0.75),
    (6, 9, 0.70),
    (7, 10, 0.65),
    (1, 5, 0.95),
    (2, 6, 0.90),
    (3, 7, 0.85),
    (4, 8, 0.80),
    (5, 9, 0.75),
    (6, 10, 0.70),
    (1, 6, 0.95),
    (2, 7, 0.90),
    (3, 8, 0.85),
    (4, 9, 0.80),
    (5, 10, 0.75),
    (1, 7, 0.95),
    (2, 8, 0.90),
    (3, 9, 0.85),
    (4, 10, 0.80),
    (1, 8, 0.95),
    (2, 9, 0.90),
    (3, 10, 0.85);





-- CREATE TABLE matches (
--     id SERIAL PRIMARY KEY,
--     logged_in_user INT NOT NULL,
--     matched_user INT NOT NULL,
--     mutual BOOLEAN NOT NULL DEFAULT FALSE,
--     CONSTRAINT fk_matched_user
--         FOREIGN KEY (matched_user)
--         REFERENCES users (id),
--     CONSTRAINT fk_logged_in_user
--         FOREIGN KEY (logged_in_user)
--         REFERENCES users (id)
-- );


-- SNYDER NOTE>>>I DON'T HAVE CONSTRAINT FOR LIKE FUNCTIONALITY<<<
-- CREATE TABLE matches (
-- id SERIAL PRIMARY KEY,
-- logged_in_user INT REFERENCES users(id),
-- matched_user INT REFERENCES users(id),
-- mutual BOOLEAN NOT NULL DEFAULT FALSE
-- );



-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     gender TEXT NOT NULL,
--     username TEXT UNIQUE NOT NULL,
--     full_name TEXT NOT NULL,
--     mbti TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     age VARCHAR(3) NOT NULL,
--     hashed_password TEXT NOT NULL,
--     bio TEXT,
--     interests TEXT[],
--     picture TEXT,
--     zip_code VARCHAR(5) NOT NULL
-- );




-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     gender TEXT NOT NULL,
--     username TEXT UNIQUE NOT NULL,
--     full_name TEXT NOT NULL,
--     mbti TEXT NOT NULL,
--     -- mbti_id INT REFERENCES mbtis(id),
--     email TEXT UNIQUE NOT NULL,
--     gender TEXT NOT NULL,
--     age VARCHAR(3) NOT NULL,
--     mbti TEXT NOT NULL,
--     hashed_password TEXT NOT NULL,
--     bio TEXT,
--     interests TEXT[],
--     picture TEXT,
--     zip_code VARCHAR(5) NOT NULL,
--     -- interest TEXT,
--     picture TEXT
--     -- matches_id INT
--     -- CONSTRAINT fk_matches
--     --     FOREIGN KEY (matches_id)
--     --     REFERENCES matches (id)
-- );


-- CREATE TABLE interests (
--     id SERIAL PRIMARY KEY,
--     interest_name TEXT NOT NULL
-- );

-- CREATE TABLE user_interest (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, interest_id)
-- );
