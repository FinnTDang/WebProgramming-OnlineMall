const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  res.render("index");
});

