const db = require("../db");

const INSERT_INTO_CUSTOMERS = "INSERT INTO customers SET ?";
const SELECT_USER_BY_NAME_LASTNAME =
  "SELECT * FROM customers WHERE customerName = ? AND customerLastname = ?";
const CHECK_LOGIN_PASSWORD =
  "SELECT * FROM customers WHERE login = ? AND password = BINARY ?";
const CHECK_LOGIN = "SELECT * FROM customers WHERE login = ?";

function User(customer) {
  // this.customerId = customer.customerId;
  this.customerName = customer.customerName;
  this.customerLastname = customer.customerName;
  this.customerAddress = customer.customerAddress;
  this.login = customer.login;
  this.password = customer.password;
}

// CREATE - Check if user exist
User.createUser = (req, res) => {
  const user = req.body;
  db.query(CHECK_LOGIN, [user.login], (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log(results.length);
      // res.json(results.length);
      if (results.length > 0) {
        console.log("user exist ");
        res.send({ status: "user exist" });
      } else {
        db.query(INSERT_INTO_CUSTOMERS, user, (err, results) => {
          if (err) {
            console.log("error: ", err);
            res.send({ status: "fail" });
          } else {
            console.log("New user created, id: " + results.insertId);
            res.send({
              status: "success",
              login: user.login,
              password: user.password,
            });
          }
        });
      }
    }
  });
};

// READ
User.loginByLoginPassword = (req, res) => {
  const user = req.body;
  db.query(
    CHECK_LOGIN_PASSWORD,
    [user.login, user.password],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.send({ status: "fail" });
      } else {
        if (results.length > 0) {
          console.log(results);
          res.send({ status: "Success Login" });
        } else {
          res.send({ status: "Wrong login or password" });
        }
      }
    }
  );
};

User.showUserByNameLastname = (req, res) => {
  const user = req.body;
  db.query(
    SELECT_USER_BY_NAME_LASTNAME,
    [user.customerName, user.customerLastname],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
        res.send({ status: "fail" });
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
};

module.exports = User;
