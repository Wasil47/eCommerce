const db = require("../db");

const INSERT_INTO_CUSTOMERS = "INSERT INTO customers SET ?";
const SELECT_USER_BY_NAME_LASTNAME =
  "SELECT * FROM customers WHERE customerName = ? AND customerLastname = ?";

function User(customer) {
  // this.customerId = customer.customerId;
  this.customerName = customer.customerName;
  this.customerLastname = customer.customerName;
  this.customerAddress = customer.customerAddress;
}

// CREATE
User.createUser = (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  db.query(INSERT_INTO_CUSTOMERS, newUser, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("New user created, id: " + results.insertId);
      res.send({
        status: "success",
        login: newUser.customerName,
        password: newUser.customerLastname,
      });
    }
  });
};

// CREATE - Check if user exist
User.test = (req, res) => {
  const user = req.body;
  db.query(
    SELECT_USER_BY_NAME_LASTNAME,
    [user.customerName, user.customerLastname],
    (err, results) => {
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
                login: user.customerName,
                password: user.customerLastname,
              });
            }
          });
        }
      }
    }
  );
};

// READ
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
