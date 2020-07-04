const db = require("../config/db.config");
const dbCommands = require("../config/dbCommands.config");
const c = dbCommands.productsCommands;

const ifDbErr = (err, res) => {
  if (err) {
    console.log("mySQL error:", err);
    return res.status(400).send({
      message: "Backend/DB error",
    });
  }
};

// CREATE (POST)
// /
exports.createProduct = (req, res) => {};
// /noimage
exports.createProductNoImage = (req, res) => {
  const newProduct = req.body;
  db.query(c.INSERT_INTO_PRODUCTS, newProduct, (err, results) => {
    ifDbErr(err, res);
    console.log("New product created, id: " + results.insertId);
    res.status(201).send({
      message: "New product created, name: " + newProduct.productName,
    });
  });
};

// READ (GET)
// /
exports.showAllProducts = (req, res) => {
  db.query(c.SELECT_ALL_PRODUCTS, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results);
      // res.json(results);
    }
  });
};
// /:productId
exports.showProductById = (req, res) => {
  const productId = req.params.productId;
  db.query(c.SELECT_PRODUCT_BY_ID + productId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      res.status(200).send(results[0]);
      // res.json(results);
    }
  });
};

// UPDATE (PATCH)
// /:productId
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  db.query(c.UPDATE_PRODUCT + productId, updatedProduct, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("Product updated, id: " + productId, results.message);
      res.status(200).send({
        message: "Product updated!",
      });
    }
  });
};

// DELETE (DELETE)
// /:productId
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  db.query(c.DELETE_FROM_PRODUCTS_ID + productId, (err, results) => {
    ifDbErr(err, res);
    if (results) {
      console.log("Product deleted: " + results.affectedRows);
      res.status(200).send({
        message: "Product deleted!",
      });
    }
  });
};
