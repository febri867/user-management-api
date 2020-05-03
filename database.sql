CREATE DATABASE user

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    photo BLOB,
    salary INT,
    designation ENUM('manager', 'staff', 'chief')
);