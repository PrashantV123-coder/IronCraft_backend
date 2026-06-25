const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },

    selectedImage: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      default: "",
    },

    contact: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "progress", "complete", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);