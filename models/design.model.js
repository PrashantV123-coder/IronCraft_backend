const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    uses: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const designSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "gate",
        "shutter",
        "grill",
        "window",
        "ladder",
        "welding",
        "otherservices",
      ],
    },
    productName: {
      type: String,
      required: true,
    },
    productData: productSchema,
  },
  {
    timestamps: true,
  }
);

const designModel = mongoose.model("Design", designSchema);

module.exports = designModel;