const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");
const verifySingup = require("../middleware/verifySingup");


router.route("/register")
.post(verifySingup, UserController.singup);
router.route("/login")
.post(UserController.login);
router.route("/authorized")
.get(authJwt, UserController.showUserDataByLogin)
.patch(authJwt, UserController.update);

module.exports = router;