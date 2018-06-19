var inquire = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ahndong92",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.clear();
    mainMenu();
});

function mainMenu() {
    inquire.prompt([{
            name: 'command',
            message: 'What would you like to do today?',
            type: 'list',
            choices: ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }])
        .then(function (results) {
            if (results.command === 'View Products') {
                viewProducts();
            } else if (results.command === 'View Low Inventory') {
                viewLowInv();
            } else if (results.command === 'Add to Inventory') {
                addToInv();
            } else if (results.command === 'Add New Product') {
                addNew();
            } else if (results.command === 'Exit') {
                return;
            }
        });
};


function viewProducts() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log('item_id: ' + results[i].item_id + '. Product: ' + results[i].product_name + '. Price: $' + results[i].price + '. Current Quantity: ' + results[i].stock_quantity)
        };
        returnToMenu();
    });
};

function viewLowInv() {
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log('item_id: ' + results[i].item_id + '. Product: ' + results[i].product_name + '. Current Quantity: ' + results[i].stock_quantity);
        };
        returnToMenu();
    });
};

function addToInv() {
    inquire.prompt([{
                name: 'itemUpdate',
                message: 'Which item would you like to update? (update by item_id)',
                type: 'input'
            },
            {
                name: 'stockUpdate',
                message: 'What is the new quantity of the item?',
                type: 'input'
            }
        ])
        .then(function (results) {
            connection.query('UPDATE products SET stock_quantity=' + results.stockUpdate + ' WHERE item_id=' + results.itemUpdate, function (err, results) {
                if (err) throw err;
                console.log('The product has been restocked.')
            });
            returnToMenu();
        });
};

function addNew() {
    inquire.prompt([{
                name: 'itemName',
                message: 'Input item name.',
                type: 'input'
            },
            {
                name: 'stock',
                message: 'What is the quantity?',
                type: 'input'
            },
            {
                name: 'dpmt',
                message: 'What category is this product?',
                type: 'input',
            },
            {
                name: 'price',
                message: 'Price per unit?',
                type: 'input'
            }
        ])
        .then(function (results) {
            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES' + "('" + results.itemName + "', '" + results.dpmt + "', " + results.price + ", " + results.stock + ")", function (err, results) {
                if (err) throw err;
                console.log('New product added to Bamazon.')
            });
            returnToMenu();
        });
};

function returnToMenu() {
    inquire.prompt([{
            name: 'menu',
            message: 'Would you like to return to the main menu?',
            type: 'confirm'
        }])
        .then(function (results) {
            if (results.menu) {
                console.clear();
                mainMenu();
            } else if (!results.menu) {
                console.log('Okay. Bye.');
                connection.end();
                return;
            };
        });
};