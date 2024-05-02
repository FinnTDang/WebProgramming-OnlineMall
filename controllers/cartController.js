const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

//Display Cart on GET
exports.cart_display = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Display cart");
});

//Update Cart on POST
exports.cart_update = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Cart update");
});