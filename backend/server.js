const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');
const db = require("./db");
// const Product = require("./models/product.model");

// require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to SQL database!");
});

app.get("/", (req, res) => {
  res.send("go to /products to check products list.");
});

const routes = require("./routes/appRoutes");
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
