const userTableName = "customers";
const productsTableName = "products";

// reusable mySQL commands:
const userCommands = {
  INSERT_INTO_USERS: `INSERT INTO ${userTableName} SET ?`,
  SELECT_USER_BY_LOGIN: `SELECT * FROM ${userTableName} WHERE login = ?`,
  UPDATE_USER: `UPDATE ${userTableName} SET ? WHERE login = ?`,
};
const productsCommands = {
  INSERT_INTO_PRODUCTS: `INSERT INTO ${productsTableName} SET ?`,
  SELECT_ALL_PRODUCTS: `SELECT * FROM ${productsTableName}`,
  SELECT_PRODUCT_BY_ID: `SELECT * FROM ${productsTableName} WHERE productId = `,
  UPDATE_PRODUCT: `UPDATE ${productsTableName} SET ? WHERE productId = `,
  DELETE_FROM_PRODUCTS_ID: `DELETE FROM ${productsTableName} WHERE productId = `,
};

const dbCommands = {
  userCommands: userCommands,
  productsCommands: productsCommands  
}
module.exports = dbCommands;