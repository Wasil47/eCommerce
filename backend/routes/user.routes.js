const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");
const verifySingup = require("../middleware/verifySingup");

router.route("/register-new")
.post(verifySingup, UserController.singup);
router.route("/login-new")
.post(UserController.login);
router.route("/authorized-new")
.patch(authJwt, UserController.update);

// router.post("/register-new", verifySingup, UserController.singup);

module.exports = router;
