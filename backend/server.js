const express = require("express");
const cors = require("cors");
const db = require("./db");
const Product = require("./models/product.model");

// require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to SQL database!");
});


app.get("/", (req, res) => {
  res.send("go to /products to check products list.");
});

const routes = require('./routes/appRoutes');
routes(app);
// app.get("/products", (req, res) => {
//   const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products"; // Show all products
//   db.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json({
//         data: results,
//       });
//       // res.send(results);
//     }
//   });
// });

app.get("/products/table", (req, res) => {
  const DESCRIBE_TABLE_PRODUCT_QUERY = "DESCRIBE products";
  db.query(DESCRIBE_TABLE_PRODUCT_QUERY, (err, results) => {
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

const test = {
  productName: "testProduct 4",
  productPrice: 4444.63,
  productStock: 40,
  productImage: null,
  productDesc: "T4444444444t 4 test",
};

app.get("/products/test", (req, res) => {
  const testProduct = new Product(test);
  res.send(testProduct);
  // Product.createProduct(testProduct);

  // db.query(
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

  // db.query(INSERT_PRODUCTS_QUERY, (err, results)=>{
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
