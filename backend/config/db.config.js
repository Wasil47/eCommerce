const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* Set connect with SQL Database */
const db = mysql.createConnection({
  host: process.env.SQL_SERVER, // "localhost"
  user: process.env.SQL_LOGIN, // "root"
  password: process.env.SQL_PASSWORD, // 1234
  database: process.env.SQL_DB_NAME, // "shop_react_sql"
});
/* If connection throw an error, try this commend in ur database:
ALTER USER '<user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>' */
// not recommended in production :)

module.exports = db;