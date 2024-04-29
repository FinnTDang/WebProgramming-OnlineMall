const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    aggregated_price: { type: Number }
  }],
});

CartSchema.virtual("url").get(function () {
  return `/${user._id}/cart`
});

module.exports = mongoose.model("Cart", CartSchema);