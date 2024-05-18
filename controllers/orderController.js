const Order = require("../models/order");
const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//Display list of all Order on GET
exports.orders_display = asyncHandler(async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    res.redirect('/signin');
    return;
  }

  const orders = await Order.find({ user: user._id }).populate({path: 'items', populate: { path: 'product'}}).sort({ date_added: -1 });
  res.render('orders', { title: 'Orders', orders: orders });
});

//Display Order on GET
exports.successful_order_display = asyncHandler(async (req, res, next) => {
  res.render('successful_order');
});

//Create order on POST 
exports.order_create = asyncHandler(async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    res.redirect('/signin');
    return;
  }

  const cart = await Cart.findOne({ user: user._id }).populate({path: 'items', populate: { path: 'product', populate: { path: 'store' }}});
  if (!cart) {
    res.status(400).send("No cart found.");
    return;
  }
  
  const sum = cart.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    user: user._id,
    items: cart.items,
    sum: sum
  });

  await order.save();
  
  // clear cart after placing order
  cart.items = [];
  await cart.save();

  res.redirect('/successful_order');
});

//Update Order on POST
exports.cart_update_form = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Order update");
});

//Delete Order on POST
exports.cart_update = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Order delete");
});