const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  store: { type: Schema.Types.ObjectId, ref:"Store", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  time_sold: { type: Number, default: 0 },
  date_added: { type: Date, default: Date.now },
  index_featured: { type: Boolean },
  store_featured: { type: Boolean }
});

// Virtual for user's URL
ProductSchema.virtual("url").get(function () {
  return `/stores/${this.store._id}/products/${this._id}`;
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);