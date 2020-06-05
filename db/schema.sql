DROP DATABASE IF EXISTS houses_db;
CREATE DATABASE houses_db;

USE houses_db;

CREATE TABLE house(
id INT AUTO_INCREMENT NOT NULL,
city VARCHAR(1000),
address VARCHAR(1000),
price INT,
square_feet INT,
bedrooms INT,
bathrooms INT,
pool BOOLEAN,

Primary Key(id)
);
