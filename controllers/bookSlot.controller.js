const BookSlot = require("../models/bookSlot.model");

// Get all slots
const getSlots = async (req, res) => {
  try {
    const bookSlots = await BookSlot.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create slot
const createSlot = async (req, res) => {
  try {
    const bookSlot = await BookSlot.create(req.body);

    res.status(201).json({
      success: true,
      bookSlot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update slot status
const updateSlotStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const bookSlot = await BookSlot.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bookSlot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      bookSlot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete slot
const deleteSlot = async (req, res) => {
  try {
    const bookSlot = await BookSlot.findByIdAndDelete(req.params.id);

    if (!bookSlot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSlots,
  createSlot,
  updateSlotStatus,
  deleteSlot,
};