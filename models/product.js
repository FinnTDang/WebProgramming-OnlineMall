const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  store: { type: Schema.Types.ObjectId, ref:"Store", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Virtual for user's URL
ProductSchema.virtual("url").get(function () {
  return `/stores/${this.store._id}/products/${this._id}`;
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);