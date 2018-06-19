CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

SELECT * FROM products;

DESCRIBE products;

ALTER TABLE products
ADD product_sales DECIMAL(18,2) NOT NULL DEFAULT 0.00;


CREATE TABLE departments(
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs VARCHAR(50) NOT NULL
);



SELECT * FROM departments;




SELECT departments.department_id AS DEPT_ID, departments.department_name as DEPT_NAME, products.product_sales as PRODUCT_SALES, departments.over_head_costs as OVERHEAD_COSTS,products.product_sales - departments.over_head_costs as TOTAL_PROFIT
FROM departments
LEFT JOIN products
ON products.department_name = departments.department_name
ORDER BY DEPT_ID ASC;






