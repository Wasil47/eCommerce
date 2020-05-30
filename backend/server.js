const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());

/* Set connect with SQL Database */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "shop_react_sql",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Successfully connected to SQL database!");
  }
});
/* If connection throw an error, try this commend in ur database:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>' */

app.get("/", (req, res) => {
  res.send("go to /products to check products list.");
});

app.get("/products", (req, res) => {
  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products"; // Show all products
  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        data: results,
      });
      // res.send(results);
    }
  });
});
app.get("/products/table", (req, res) => {
  const DESCRIBE_TABLE_PRODUCT_QUERY = "DESCRIBE products";
  connection.query(DESCRIBE_TABLE_PRODUCT_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        data: results,
      });
      // res.send(results);
    }
  });
});

function Product(product) {
  // this.productId = product.productId;
  this.productName = product.productName;
  this.productPrice = product.productPrice;
  this.productStock = product.productStock;
  this.productImage = product.productImage;
  this.productDesc = product.productDesc;
};

const test = {
  productName: "testProduct 2",
  productPrice: 666.6,
  productStock: 10,
  productImage: null,
  productDesc: "Test 222222222222product testin test",
};

app.get("/products/test", (req, res) => {
  const testProduct = new Product(test);
  res.send(testProduct);
  // connection.query(
  //   "INSERT INTO products SET ?",
  //   [testProduct],
  //   (err, result) => {
  //     if (err) throw err;
  //     res.send("Sucessfully added product");
  //   }
  // );
});

app.get("/products/add", (req, res) => {
  const { id, name, price, stock, img, desc } = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (
    productId,
    productName,
    productPrice,
    productStock,
    productImage,
    productDesc)
    VALUES (
      ${id},
      "${name}",
      ${price},
      ${stock},
      "${img}",
      "${desc}"
    )`;

  console.log(id, name, price, stock, img, desc);
  console.log(req.query);

  // connection.query(INSERT_PRODUCTS_QUERY, (err, results)=>{
  //   if (err) {
  //     return res.send(err);
  //   }
  //   else {
  //     return res.send('Sucessfully added product');
  //   }
  // })
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
