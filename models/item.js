const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number },
  aggregate_price: { type: Number }
});

module.exports = mongoose.model("Item", ItemSchema);