const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");

const userRoutes = require("./routes/user.routes");
const productsRoutes = require("./routes/products.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.use("/uploads", express.static("uploads")); // set uploads folder to public (static)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to SQL database!");
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to my Node.js server. Go to /products to check products list."
  );
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);


// fix login (frontend) then: delete
// const routes = require("./routes/appRoutes");
// routes(app);
/// end of delete section

module.exports = app;