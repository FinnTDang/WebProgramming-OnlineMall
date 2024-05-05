const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  // const new_stores;
  // const new_products;
  // const featured_stores;
  // const featured_products;

  // fetch data from db
  const new_stores = await Store.find({}).limit(0); 
  const new_products = await Product.find({}).limit(0);
  const featured_stores = await Store.find({}).limit(0);
  const featured_products = await Product.find({}).limit(0);

  res.render('index', { 
    new_stores: new_stores, 
    new_products: new_products,
    featured_stores: featured_stores,
    featured_products: featured_products
  }); 
  
  // res.render("index");
});

