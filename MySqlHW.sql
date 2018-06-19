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
    product_name = "Casio Men's Digital Watch",
    department_name = 'accessory',
    price = 26.99,
    stock_quantity = 1000;
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Nintendo Switch", "electronics", 299, 1000), ("Canvas Messenger Bag", "accessory", 34.99, 1000),
("Echo Dot", "electronics", 39.99, 1000),("Catnip", "pet", 4.65, 1000), 
("Cat food", "pet", 14.12, 1000), ("Green Tea", "food", 13.97, 1000), 
("Pusheen Stuffed Pillow", "toy", 16.96, 1000),("Casio Men's Digital Watch", "accessory", 26.99, 1000);



UPDATE products SET stock_quantity = 3
WHERE item_id = 1;

SELECT * FROM products;

DESCRIBE products;

ALTER TABLE products
ADD product_sales DECIMAL(18,2);

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(18,2) NOT NULL DEFAULT 0.00;

UPDATE products SET product_sales = (product_sales + (price * 10))
WHERE item_id = 2;



CREATE TABLE departments(
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs VARCHAR(50) NOT NULL
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ('clothing', 1000), ('electronics', 1000), ('accessory', 1000), ('pet', 1000), ('food', 1000), ('toy', 1000), ('human', 1000), ('cat', 100000);

SELECT * FROM departments;




SELECT departments.department_id AS DEPT_ID, departments.department_name as DEPT_NAME, products.product_sales as PRODUCT_SALES, departments.over_head_costs as OVERHEAD_COSTS,products.product_sales - departments.over_head_costs as TOTAL_PROFIT
FROM departments
RIGHT JOIN products
ON products.department_name = departments.department_name
ORDER BY DEPT_ID ASC;



INSERT INTO departments (department_name, over_head_costs) VALUES ("Department", 10);



