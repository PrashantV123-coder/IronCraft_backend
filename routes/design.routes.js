const express = require('express');
const {
  getDesigns,
  addDesign,
  updateDesign,
  deleteDesign,
}  = require("../controllers/designController.js");

const router = express.Router();

router.get("/", getDesigns);
router.post("/", addDesign);
router.put("/:id", updateDesign);
router.delete("/:id", deleteDesign);

module.exports = router;