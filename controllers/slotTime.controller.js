const SlotTiming = require("../models/slotTime.model");

exports.getSlot = async (req, res) => {
  try {
    const slot = await SlotTiming.findOne();

    res.status(200).json({
      success: true,
      slot,
    });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveSlot = async (req, res) => {
  try {
    let slot = await SlotTiming.findOne();

    if (slot) {
      slot = await SlotTiming.findByIdAndUpdate(slot._id, req.body, {
        new: true,
      });
    } else {
      slot = await SlotTiming.create(req.body);
    }

    res.status(200).json({
      success: true,
      slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    await SlotTiming.deleteMany({});

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
