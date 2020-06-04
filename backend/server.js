const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');
const db = require("./db");
const Product = require("./models/product.model");

// require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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

app.post("/products/test", (req ,res)=> {
  console.log(req.body);
  res.send({status: 'success'});
  // res.send(req.body);
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

// app.get("/products/add", (req, res) => {
//   const { name, price, stock, img, desc } = req.query;
//   const INSERT_PRODUCTS_QUERY = `INSERT INTO products (
//     productName,
//     productPrice,
//     productStock,
//     productImage,
//     productDesc)
//     VALUES (
//       "${name}",
//       ${price},
//       ${stock},
//       "${img}",
//       "${desc}"
//     )`;

//   console.log(name, price, stock, img, desc);
//   console.log(req.query);

//   db.query(INSERT_PRODUCTS_QUERY, (err, results)=>{
//     if (err) {
//       return res.send(err);
//     }
//     else {
//       return res.send('Sucessfully added product');
//     }
//   })
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
