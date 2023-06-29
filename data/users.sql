DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    mbti TEXT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    placeholder2 TEXT NULL
);


INSERT INTO users (
    id,
    full_name,
    mbti,
    email,
    password,
    username,
    placeholder2
  )
VALUES (
    1,
    'JAY',
    'ENFJ',
    'JAY@JAY.COM',
    'password',
    'username',
    'placeholder2:text'
  );
