const db = require("../db");
const formidable = require("formidable");

const formidableOptions = {
  // multiples: true,
  uploadDir: "uploads/",
};
const form = formidable(formidableOptions);

function Product(product) {
  // this.productId = product.productId;
  this.productName = product.productName;
  this.productPrice = product.productPrice;
  this.productStock = product.productStock;
  this.productImage = product.productImage;
  this.productDesc = product.productDesc;
}

Product.showAllProducts = (req, res) => {
  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";
  db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

Product.describeProductsTable = (req, res) => {
  const DESCRIBE_TABLE = "DESCRIBE products";
  db.query(DESCRIBE_TABLE, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

Product.createProduct = (req, res) => {
  const INSERT_INTO_PRODUCTS = "INSERT INTO products SET ?";

  form
    .on("fileBegin", (name, file) => {
      //rename the incoming file to the file's name
      if (file.name !== "") {
        file.path = form.uploadDir + file.name;
        // file.path = __dirname + '/uploads/'+ file.name;
      }
    })
    .parse(req, (err, fields, files) => {
      if (err) {
        res.send({ status: "upload fail" });
        console.log("upload error", err);
      } else {
        fields.productImage = files.productImage.path;
        db.query(INSERT_INTO_PRODUCTS, fields, (error, results) => {
          if (error) {
            console.log("mySQL error: ", error);
            res.send({ status: "sql fail" });
          } else {
            console.log("New product added, id: " + results.insertId);
            res.send({ status: "success" });
          }
        });
      }
    });
  // res.send({ status: "success" });
};

Product.createProductNoImage = (req, res) => {
  const INSERT_INTO_PRODUCTS = "INSERT INTO products SET ?";
  console.log(req.body);
  const newProduct = req.body;
  db.query(INSERT_INTO_PRODUCTS, newProduct, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("New product added, id: " + results.insertId);
      res.send({ status: "success" });
    }
  });
};

Product.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const DELETE_FROM_PRODUCTS_ID = "DELETE FROM products WHERE productId = ";
  console.log(DELETE_FROM_PRODUCTS_ID + productId);
  db.query(DELETE_FROM_PRODUCTS_ID + productId, (err, results) => {
    if (err) {
      console.log("error: ", err);
      res.send({ status: "fail" });
    } else {
      console.log("Product deleted: " + results.affectedRows);
      res.send({ status: "success" });
    }
  });
};

module.exports = Product;
