var inquire = require('inquirer');
var mysql = require('mysql');
var {
    table
} = require('table');

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

    mainMenu();
});




function mainMenu() {
    inquire.prompt([{
            name: 'command',
            message: 'What would you like to do today?',
            type: 'list',
            choices: ['View Product Sales by Department', 'Create New Department']
        }])
        .then(function (results) {
            // console.clear();
            if (results.command === 'View Product Sales by Department') {
                viewSales();
            } else if (results.command === 'Create New Department') {
                createDept();
            };
        });
};

function viewSales() {
    var sql = 'SELECT departments.department_id AS DEPT_ID, departments.department_name as DEPT_NAME, products.product_sales as PRODUCT_SALES, departments.over_head_costs as OVERHEAD_COSTS,products.product_sales - departments.over_head_costs as TOTAL_PROFIT FROM departments LEFT JOIN products ON products.department_name = departments.department_name ORDER BY DEPT_ID ASC;'
    connection.query(sql, function (err, results) {
        if (err) throw err;
        var data, output;
        for (var i = 0; i < results.length; i++) {
            data = [
                ['DEPT_ID', 'DEPT_NAME', 'PRODUCT_SALES', 'OVERHEAD_COSTS', 'TOTAL_PROFIT'],
                [results[i].DEPT_ID, results[i].DEPT_NAME, results[i].PRODUCT_SALES, results[i].OVERHEAD_COSTS, results[i].TOTAL_PROFIT]
            ]
            output = table(data);
            console.log(output);
        }
        returnToMenu();
    });

};




function createDept() {
    inquire.prompt([{
                name: 'deptName',
                message: 'What is the new department name?',
                type: 'input'
            },
            {
                name: 'overheadCost',
                message: 'What is the overhead cost?',
                type: 'input'
            }
        ])
        .then(function (results) {
            var sql = 'INSERT INTO departments (department_name, over_head_costs) VALUES' + "('" + results.deptName + "'" + "," + "'" + results.overheadCost + "')";;
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log('Department added.');
                returnToMenu();
            });
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
                mainMenu();
            } else if (!results.menu) {
                console.log('Okay. Bye.');
                connection.end();
                return;
            };
        });
};