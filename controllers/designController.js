const Design = require("../models/design.model.js");

module.exports.getDesigns = async (req, res) => {
  try {
    const designs = await Design.find();

    res.status(200).json({
      success: true,
      designs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.addDesign = async (req, res) => {
  try {
    const design = await Design.create(req.body);

    res.status(201).json({
      success: true,
      design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteDesign = async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};