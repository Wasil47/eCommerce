const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');
const db = require("./config/db.config");
// const Product = require("./models/product.model");
// const session = require("express-session"); // create cookis

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 4000;

app.use("/uploads", express.static("uploads")); // set uploads folder to public (static)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

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
