const express = require("express");

const {
  getSlots,
  createSlot,
  updateSlotStatus,
  deleteSlot,
} = require("../controllers/bookSlot.controller");

const router = express.Router();

router.route("/")
  .get(getSlots)
  .post(createSlot);

router.route("/:id")
  .put(updateSlotStatus)
  .delete(deleteSlot);

module.exports = router;