const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Cart", cartSchema);
