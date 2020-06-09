const Product = require("../models/product.model");
const User = require("../models/user.model");

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
  app.route("/products/noimage")
  .post(Product.createProductNoImage);
  app.route("/products/:id")
  .get(Product.showProductById)
  .patch(Product.updateProduct)
  .delete(Product.deleteProduct);
  app.route("/products/table")
  .get(Product.describeProductsTable);
  app.route("/user")
  .get(User.showUserByNameLastname)
  .post(User.test);
  // .post(User.createUser);
};