CREATE DATABASE companydb;

USE companydb;

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(5) DEFAULT NULL,
  PRIMARY KEY(id)
);

DESCRIBE employee;

INSERT INTO employee VALUES 
 (1, "aaa", 120),
 (2, "bbb", 350),
 (3, "ccc", 140),
 (4, "ddd", 520);
