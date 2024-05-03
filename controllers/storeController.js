const { default: mongoose } = require("mongoose");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//READ all Stores alphabetically on GET
exports.store_list_alphabet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Store list by alphabet");
});

//READ all Stores by category on GET
exports.store_list_category = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Store list by category");
});


//READ Store detail on GET
exports.store_page_get = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ _id: req.params.id }).exec();
  res.render('store', { store: store });
});

//READ Store create-form on GET
exports.store_create_get= asyncHandler(async (req, res, next) => {
  res.render('store_create');
});

//CREATE Store on POST
exports.store_create_post = asyncHandler(async (req, res, next) => {
  const new_store = new Store({
    _id: req.id,
    owner: req.session.user._id,
    business_name: req.body.business_name,
    store_name: req.body.store_name,
    store_category: req.body.store_category,
    store_logo: '/public/images/stores/' + req.id, 
  });
  await new_store.save();

  res.redirect(`/stores/${req.id}`);
});

//READ Store update-form on GET
exports.store_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update store form");
});

//UPDATE Store on POST
exports.store_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update store");
});

//DELETE Store on POST
exports.store_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Delete store");
});