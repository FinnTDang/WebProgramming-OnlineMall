const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  // const new_stores;
  // const new_products;
  // const featured_stores;
  // const featured_products;
  
  res.render("index");
});

