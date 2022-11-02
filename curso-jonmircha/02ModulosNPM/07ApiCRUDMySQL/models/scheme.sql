DROP DATABASE IF EXISTS movies;

CREATE DATABASE IF NOT EXISTS movies;

USE movies;

CREATE TABLE IF NOT EXISTS movie(
	movie_id VARCHAR(9) PRIMARY KEY,
	title VARCHAR(100),
	release_year VARCHAR(4),
	rating DECIMAL(2,1), 
	image VARCHAR(255)
);
--en el rating(2,4)significa que tiene dos posiciones y una es flotante