const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  const recentDate = new Date();
    // fetch new stores/products (created within the last 30 days)
  recentDate.setDate(recentDate.getDate() - 30);  

  const new_stores = await Store.find({ date_added: { $gte: recentDate } }).limit(8);
  const new_products = await Product.find({ date_added: { $gte: recentDate } }).limit(8);


  // fetch featured stores/products 
  const featured_stores = await Store.find({}).limit(8);
  const featured_products = await Product.find({}).limit(8);

  res.render('index', {
    title: "Home",
    new_stores: new_stores, 
    new_products: new_products,
    featured_stores: featured_stores,
    featured_products: featured_products
  }); 
});
