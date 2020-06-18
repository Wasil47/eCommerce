const mysql = require("mysql");
require("dotenv").config();

/* Set connect with SQL Database */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "shop_react_sql",
});
/* If connection throw an error, try this commend in ur database:
ALTER USER '<user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>' */

module.exports = connection;
