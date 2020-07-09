const mysql = require("mysql");

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
// not recommended in production :)

module.exports = db;