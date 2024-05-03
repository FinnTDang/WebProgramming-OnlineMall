const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  const new_stores = await Store.find().sort({_id: -1}).limit(5).exec();

  const new_products = await Product.find().sort({_id: -1}).limit(5).exec();

  const featured_stores = await Store.find({ featured: true }).exec();

  const featured_products = await Product.find({ index_featured: true }).exec();

  console.log(new_stores, new_products, featured_stores, featured_products);

  res.render("index", {
    new_stores: new_stores,
    new_products: new_products,
    featured_stores: featured_stores,
    featured_products: featured_products
  });
});

