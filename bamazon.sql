CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products SET
    product_name = 'jeans',
    department_name = 'clothing',
    price = 39.99,
    stock_quantity = 500;

INSERT INTO products SET
    product_name = 'cast iron pan',
    department_name = 'cooking',
    price = 49.99,
    stock_quantity = 500;


SELECT * FROM products;