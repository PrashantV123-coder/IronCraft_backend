const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");

router.route("/")
  .post(createOrder)
  .get(getOrders);

router.route("/:id")
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;