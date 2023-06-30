DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS compatibility;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    full_name TEXT NOT NULL,
    mbti TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    age INT NOT NULL,
    bio TEXT,
    interest TEXT,
    picture TEXT
);


CREATE TABLE compatibility (
    id SERIAL PRIMARY KEY,
    user_id_1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 INT REFERENCES users(id) ON DELETE CASCADE,
    strength FLOAT NOT NULL
);
