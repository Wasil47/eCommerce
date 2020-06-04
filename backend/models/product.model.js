const db = require('../db');

function Product(product) {
  // this.productId = product.productId;
  this.productName = product.productName;
  this.productPrice = product.productPrice;
  this.productStock = product.productStock;
  this.productImage = product.productImage;
  this.productDesc = product.productDesc;
}

Product.showAllProducts = (req, res) => {
  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products"; // Show all products
  db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

Product.createProduct = (req, res) => {
  const INSERT_INTO_PRODUCTS = "INSERT INTO products SET ?";
  console.log(req.body);
  const newProduct = req.body;
  db.query(INSERT_INTO_PRODUCTS , newProduct, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({status: 'fail'});
    } else {
      console.log("New product added, id: " + results.insertId);
      res.send({status: 'success'});
    }
  });  
};

Product.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const DELETE_FROM_PRODUCTS_ID = "DELETE FROM products WHERE productId = ";
  console.log(DELETE_FROM_PRODUCTS_ID+productId);
  db.query(DELETE_FROM_PRODUCTS_ID+productId, (err, results)=> {
    if (err) {
      console.log("error: ", err);
      res.send({status: 'fail'});
    } else {
      console.log("Product deleted: " + results.affectedRows);
      res.send({status: 'success'});
    }
  })
};

module.exports = Product;