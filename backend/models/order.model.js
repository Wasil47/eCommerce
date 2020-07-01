const db = require("../config/db.config");

const INSERT_INTO_ORDERS = "INSERT INTO orders SET ?";

function Order(order) {
  // this.orderId = order.orderId;
  this.orderNumber = order.orderNumber;
  this.orderCustomerId = order.orderCustomerId;
  this.orderAmount = order.orderAmount;
  this.orderAddres = order.orderAddres;
}

// CREATE
Order.createNewOrder = (req, res) => {
  const newOrder = req.body;
  db.query(INSERT_INTO_ORDERS, newOrder, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("New order added, id: " + results.insertId);
      res.status(200).send({ message: "success" });
    }
  });
};

module.exports = Order;
