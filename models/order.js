const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  sum: { type: Number },
  date_added: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);