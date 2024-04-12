-- -----------------------------------------------------
-- DATABASE earthTech_db
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS earthTech_db DEFAULT CHARACTER SET utf8 ;
USE earthTech_db;

-- -----------------------------------------------------
-- Table earthTech_db.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
nome VARCHAR(500) NOT NULL,
username VARCHAR(60) ,
senha VARCHAR(600) NOT NULL)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table earthTech_db.mqtt
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mqtt (
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(500) NOT NULL,
username VARCHAR(70) ,
senha VARCHAR(600) NOT NULL,
host_mqtt VARCHAR(255) NOT NULL,
porta INT NOT NULL )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Insert's
-- -----------------------------------------------------

INSERT INTO users (nome, username, senha, host_user, porta) VALUES
('Patricio Sousa', 'patricio_s', 'Hop32'),
('Paula Ferraz', 'pa_ferr', 'abc456'),
('Cristiano Sales', 'csales', '67792'),
('Heitor Fiuza', 'h_fiuza', 'xyz123'),
('Carlos Henrique', 'henrique-carlos', '13lpo');
