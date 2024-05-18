const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

//READ all Stores alphabetically on GET
exports.store_list_alphabet = asyncHandler(async (req, res, next) => {
  // const stores = await Store.find({}).sort({ store_name: 1 }); // sort by name ascending
  // res.render("browse_name", { title: "Browse", stores });
  let query = {};
  if (req.query.search) {
    query.store_name = { $regex: req.query.search, $options: 'i' }; // Case-insensitive regex search
  }
  const stores = await Store.find(query).sort({ store_name: 1 });
  res.render('browse_name', { title: 'Browse', stores });
});

//READ all Stores by category on GET
exports.store_list_category = asyncHandler(async (req, res, next) => {
  // const categories = await Store.aggregate([
  //   { $group: { _id: "$store_category", stores: { $push: "$$ROOT" } } },
  //   { $sort: { _id: 1 } } // sort by category name ascending
  // ]);
  let query = {};
  if (req.query.search) {
    query.store_category = { $regex: req.query.search, $options: 'i' }; // Case-insensitive regex search
  }
  const categories = await Store.aggregate([
    { $match: query },
    { $group: { _id: "$store_category", stores: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } }
  ]);

  res.render("browse_category", { title: "Browse", categories });
});


exports.store_list = asyncHandler(async (req, res, next) => {
  const stores = await Store.find({}).exec();

  res.render('browse', {stores: stores, title: "Stores"});
});

exports.store_page_get = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ _id: req.params.id }).exec();
  const user = req.session.user ? await User.findById(req.session.user._id) : null;

  console.log("not store:", !store);
  if (!store) {
    res.redirect('/');
    return;
  }

  let is_store_owner = user ? req.session.user._id == store.owner : false;

  console.log("is_store_owner:", is_store_owner);

  let query = { store: req.params.id }; 
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  const all_products = await Product.find(query).exec();
  const new_products = await Product.find(query).sort({ date_added: -1 }).limit(4).exec();

  let wishlisted_stores = user ? user.store_wishlist.map(item => item.toString()) : [];
  const is_wishlisted = wishlisted_stores.includes(store._id.toString());
  console.log("is_wishlisted:", is_wishlisted);

  res.render('store', { 
    title: store.store_name,
    store: store, 
    all_products: all_products, 
    new_products: new_products,
    is_store_owner: is_store_owner,
    is_wishlisted: is_wishlisted
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

exports.wishlist_post = asyncHandler(async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findOne({ _id: req.session.user._id }).exec();

    if (user.store_wishlist.includes(req.params.store_id)) {
      next();
    }

    const store = await Store.findOne({ _id: req.params.store_id }).exec();
  
    user.store_wishlist.push(store);
  
    await user.save();
  
    store.wishlisted_number = store.wishlisted_number + 1;
  
    await store.save();
  } else {
    res.redirect('/signin');
  }
});