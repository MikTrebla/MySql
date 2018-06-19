# Bamazon

This fictitious online e-Commerce app utilizes node.js and MySql database.
Please make sure to install all the dependencies listed in the package.json file. Alternatively, you can type npm install to install all dependencies at once from the terminal. To use app, type **node BamazonCustomer.js** (or **BamazonManager.js** or **BamazonSupervisor.js**) into the terminal.

**BamazonCustomer.js**
Allows user to see available products, their prices, and current quantity in stock. You can then choose from a list to purchase products which will update the database according to the quantity change.

**BamazonManager.js**
Allows user to see all low inventory stock (any product with a value les than 5), re-stock the inventory, add new items, and view all the products currently in the store.

**BamazonSupervisor.js**
Allows user to check current total profit of each department and also allows the creation of new departments.
