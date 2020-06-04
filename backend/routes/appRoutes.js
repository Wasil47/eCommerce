const Product = require("../models/product.model");

// module.exports = (app) => {
//   app.route("/products")
//   .get((req, res) => {
//     Product.showAllProducts(req, res);
//   });
// };

module.exports = (app) => {
  app.route("/products")
  .get(Product.showAllProducts)
  .post(Product.createProduct);
  app.route("/products/:id")
  .delete(Product.deleteProduct);
};