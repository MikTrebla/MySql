CREATE DATABASE departments;
USE departments;

CREATE TABLE products(
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs VARCHAR(50) NOT NULL,
);


INSERT INTO products (department_name, over_head_costs)
VALUES ('clothing', 1000), ('electronics', 1000), ('accessory', 1000), ('pet', 1000), ('food', 1000), ('toy', 1000), ('human', 1000), ('cat', 100000)