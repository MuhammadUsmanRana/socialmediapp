const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Types.ObjectId, ref: "users" },
});

const Product = mongoose.model("socialProduct", productSchema);
module.exports = Product;
