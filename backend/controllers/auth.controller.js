const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/auth.config");

exports.createToken = (userLogin) => {
  return jwt.sign({ login: userLogin }, jwtConfig.secret, jwtConfig.expiresIn);
};
