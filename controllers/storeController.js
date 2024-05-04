const { default: mongoose } = require("mongoose");
const Store = require("../models/store");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.store_list = asyncHandler(async (req, res, next) => {
  const stores = await Store.find({}).exec();

  res.render('browse', {stores: stores, title: "Stores"});
});

exports.store_page_get = asyncHandler(async (req, res, next) => {
  const new_products = await Product.find({ store: req.params.id }).sort({ date_added: -1 }).limit(5).exec();

  const all_products = await Product.find({ store: req.params.id }).exec();

  const store = await Store.findOne({ _id: req.params.id }).exec();

  let is_store_owner;
  if (req.session.user) {
    is_store_owner = req.session.user._id == store.owner;
  }
  console.log(is_store_owner);

  res.render('store', { 
    store: store, 
    all_products: all_products, 
    new_products: new_products,
    is_store_owner: is_store_owner 
  });
});

exports.store_create_get= asyncHandler(async (req, res, next) => {
  res.render('store_create');
});

exports.store_create_post = asyncHandler(async (req, res, next) => {
  const new_store = new Store({
    _id: req.id,
    owner: req.session.user._id,
    business_name: req.body.business_name,
    store_name: req.body.store_name,
    store_category: req.body.store_category,
    store_logo: '/images/stores/' + req.id + '.jpeg', 
  });
  await new_store.save();

  res.redirect(`/stores/${req.id}`);
});

exports.store_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update store form");
});

exports.store_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update store");
});

exports.store_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Delete store");
});

exports.all_products = asyncHandler(async (req, res, next) => {
  const new_products = await Product.find().sort({ date_added: -1 }).limit(5).exec();
  const products = await Product.find({ store: req.params.id }).exec();

  console.log(products);

  res.render('all_products', { title: 'All Products', products: products });
});