CREATE DATABASE departments;
USE departments;

CREATE TABLE products(
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs VARCHAR(50) NOT NULL,
);
