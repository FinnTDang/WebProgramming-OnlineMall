const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

//Display list of all Order on GET
exports.order_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: List of all orders");
});

//Display Order on GET
exports.order_display = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Display order");
});

//Create order on POST 
exports.order_create = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create order");
});

//Update Order on POST
exports.cart_update_form = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Order update");
});

//Delete Order on POST
exports.cart_update = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Order delete");
});