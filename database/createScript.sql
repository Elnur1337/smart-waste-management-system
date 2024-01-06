CREATE DATABASE swms CHARACTER SET "utf8mb4";
USE swms;
CREATE TABLE locations (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	lat DECIMAL(9, 6) NOT NULL,
    lng DECIMAL(9, 6) NOT NULL,
    locationName VARCHAR(25) NOT NULL UNIQUE,
    locationDescription VARCHAR(100)
);