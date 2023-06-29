-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first VARCHAR(50),
  last VARCHAR(50),
  mbti VARCHAR(10),
  email VARCHAR(100),
  username VARCHAR(50)
);

-- Insert dummy data into the 'users' table
INSERT INTO users (first, last, mbti, email, username)
VALUES
  ('John', 'Doe', 'INTJ', 'john@example.com', 'johndoe'),
  ('Jane', 'Smith', 'INFJ', 'jane@example.com', 'janesmith'),
  ('Mike', 'Johnson', 'ESTP', 'mike@example.com', 'mikejohnson');
