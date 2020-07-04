const mysql = require("mysql");

const userTableName = "customers";
const productsTableName = "products";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* Set connect with SQL Database */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "shop_react_sql",
});
/* If connection throw an error, try this commend in ur database:
ALTER USER '<user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>' */

// reusable mySQL commands:
db.userCommands = {
  INSERT_INTO_USERS: `INSERT INTO ${userTableName} SET ?`,
  SELECT_USER_BY_LOGIN: `SELECT * FROM ${userTableName} WHERE login = ?`,
  UPDATE_USER: `UPDATE ${userTableName} SET ? WHERE login = ?`,
};
db.productsCommands = {
  INSERT_INTO_PRODUCTS: `INSERT INTO ${productsTableName} SET ?`,
};

module.exports = db;
