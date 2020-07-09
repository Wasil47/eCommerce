const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");
const verifySingup = require("../middleware/verifySingup");
const AuthController = require("../controllers/auth.controller");

router.route("/register")
.post(verifySingup, UserController.singup);
router.route("/login")
.post(UserController.login);
router.route("/authorized")
.get(authJwt, UserController.showUserDataByLogin)
.patch(authJwt, UserController.update);
router.route("/auth")
.get(AuthController.verifyToken);

module.exports = router;