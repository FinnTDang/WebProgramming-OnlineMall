const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    aggregated_price: { type: Number }
  }],
  sum: { type: Number },
  status: { type: String, enum: ["fulfilled", "pending"] }
});

OrderSchema.virtual("url").get(function () {
  return `/${user._id}/order`
});

module.exports = mongoose.model("Order", OrderSchema);