const db = require("../config/db.config");

const FIND_LOGIN = "SELECT * FROM customers WHERE login = ?";

// check duplicate login
module.exports = (req, res, next) => {
  const userLogin = req.body.login;
  db.query(FIND_LOGIN, [userLogin], (err, results) => {
    if (err) {
      console.log("mySQL error:", err);
      return res.status(400).send({
        message: "Backend/DB error",
      });
    }
    if (results.length >= 1) {
      console.log("Login exist");
      return res.status(409).send({
        message: "Failed! Username/Login is already in use!",
      });
    }
    next();
  });
};
