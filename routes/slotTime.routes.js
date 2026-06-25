const express = require("express");

const router = express.Router();

const {
  getSlot,
  saveSlot,
  deleteSlot,
} = require("../controllers/slotTime.controller");

router
  .route("/")
  .get(getSlot)
  .post(saveSlot)
  .delete(deleteSlot);

module.exports = router;