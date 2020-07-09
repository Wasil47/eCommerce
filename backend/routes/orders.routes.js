const router = require("express").Router();

const OrdersController = require("../controllers/orders.controller");
const authJwt = require("../middleware/authJwt");

router.route("/create")
.post(authJwt, OrdersController.createNewOrder);
router.route("/:userId")
.get(authJwt, OrdersController.showUserOrders);
router.route("/details/:orderId")
.get(authJwt, OrdersController.showOrderDetails);

module.exports = router;