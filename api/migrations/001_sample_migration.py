steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dummy;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE big_dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE big_dummy;
        """,
    ],
]

# # "Up" SQL statement
# """
# CREATE TABLE users (
#     id SERIAL PRIMARY KEY NOT NULL,
#     first_name VARCHAR(100) NOT NULL,
#     last_name VARCHAR(100) NOT NULL,
#     mbti VARCHAR(4) NOT NULL,
#     email VARCHAR(255) UNIQUE NOT NULL,
#     username VARCHAR(255) UNIQUE NOT NULL
# );
# """,
# # "Down" SQL statement
# """
# DROP TABLE users;
# """,
