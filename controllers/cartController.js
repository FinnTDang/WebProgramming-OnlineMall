const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

//Display Cart on GET
exports.cart_display = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.session.user._id }).exec();
  const items = cart.items;

  res.render('cart', { items: items });
});

//Update Cart on POST
exports.cart_update = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Cart update");
});