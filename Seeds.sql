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





#Departments


INSERT INTO departments (department_name, over_head_costs)
VALUES ('clothing', 1000), ('electronics', 1000), ('accessory', 1000), ('pet', 1000), ('food', 1000), ('toy', 1000), ('human', 1000), ('cat', 100000);
