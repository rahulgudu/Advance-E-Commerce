const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    }, // Stock Keeping Unit
    category: {
      type: String,
      require: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      require: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      require: [true, "Please add a color"],
      default: "As seen",
      trim: true,
    },
    quantity: {
      type: Number,
      require: [true, "Please add a quantity"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: Number,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: [String],
    },
    ratings: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
