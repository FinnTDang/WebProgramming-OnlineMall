const { default: mongoose } = require("mongoose");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

exports.store_list = asyncHandler(async (req, res, next) => {
  const stores = await Store.find({}).exec();

  res.render('browse', {stores: stores, title: "Stores"});
});

exports.store_page_get = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ _id: req.params.id }).exec();
  res.render('store', { store: store });
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