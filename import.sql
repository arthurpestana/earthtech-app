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
senha VARCHAR(600) NOT NULL,
host_user VARCHAR(255) NOT NULL,
porta INT NOT NULL )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Insert's
-- -----------------------------------------------------

INSERT INTO users (nome, username, senha, host_user, porta) VALUES
('Patricio Sousa', 'patricio_s', 'Hop32', 'localhost', 3306),
('Paula Ferraz', 'pa_ferr', 'abc456', '127.0.0.1', 3306),
('Cristiano Sales', 'csales', '67792', 'localhost', 3306),
('Heitor Fiuza', 'h_fiuza', 'xyz123', '127.0.0.1', 3306),
('Carlos Henrique', 'henrique-carlos', '13lpo', 'localhost', 3306);



