const db = require('../db');

function Product(product) {
  // this.productId = product.productId;
  this.productName = product.productName;
  this.productPrice = product.productPrice;
  this.productStock = product.productStock;
  this.productImage = product.productImage;
  this.productDesc = product.productDesc;
}
Product.createProduct = (newProduct) => {
  db.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("New product added, id: " + res.insertId);
    }
  });
};

Product.showAllProducts = (req, res) => {
  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products"; // Show all products
  db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        data: results,
      });
    }
  });
}

module.exports = Product;