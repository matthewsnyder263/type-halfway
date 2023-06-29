DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    mbti TEXT NULL,
    email TEXT NOT NULL,
    hashed_password TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    placeholder2 TEXT NULL
);
