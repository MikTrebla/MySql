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
    console.log("connected as id " + connection.threadId);
    console.clear();
    displayProducts();
});

function displayProducts() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log('Item ID: ' + results[i].item_id + ' || ' + results[i].product_name + ' || Price: $' + results[i].price + ' || Current Quantity: ' + results[i].stock_quantity)
        }
        buyItem();
    });
};

function buyItem() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        inquire.prompt([{
                    name: 'purchaseList',
                    message: 'Which item would you like to purchase?',
                    type: 'list',
                    choices: function () {
                        var productList = [];
                        for (var i = 0; i < results.length; i++) {
                            productList.push(results[i].product_name);
                        }
                        return productList;
                    }
                },
                {
                    name: 'qty',
                    message: 'How many would you like?',
                    type: 'input'
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.purchaseList) {
                        chosenItem = results[i];
                    }
                }
                if (answer.qty <= chosenItem.stock_quantity) {
                    var newQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.qty);
                    var newSales = parseInt((chosenItem.price * answer.qty).toFixed(2)) + parseInt(chosenItem.product_sales);
                    connection.query('UPDATE products SET ? WHERE ?', [{
                            stock_quantity: newQuantity,
                            product_sales: newSales
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ], function (error) {
                        if (error) throw error;
                        console.log('Your order has been placed.' + 'Your total comes to :$' + (answer.qty * chosenItem.price).toFixed(2));
                        returnToMenu();
                    })
                } else {
                    console.log('Insufficient quantity, sorry.');
                    returnToMenu();
                }

            });
    });
};

function returnToMenu() {
    inquire.prompt([{
            name: 'menu',
            message: 'Would you like to make another purchase?',
            type: 'confirm'
        }])
        .then(function (results) {
            if (results.menu) {
                console.clear();
                buyItem();
            } else if (!results.menu) {
                console.log('Please come again!');
                connection.end();
                return;
            };
        });
};