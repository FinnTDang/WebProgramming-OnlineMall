const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//READ all Stores alphabetically on GET
exports.store_list_alphabet = asyncHandler(async (req, res, next) => {
  const stores = await Store.find({}).sort({ store_name: 1 }); // sort by name ascending
  res.render("browse_name", { title: "Browse", stores });
});

//READ all Stores by category on GET
exports.store_list_category = asyncHandler(async (req, res, next) => {
  const categories = await Store.aggregate([
    { $group: { _id: "$store_category", stores: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } } // sort by category name ascending
  ]);

  res.render("browse_category", { title: "Browse", categories });
});

//READ new Stores on GET
exports.store_new = asyncHandler(async (req, res, next) => {
  // res.send("NOT IMPLEMENTED: New stores");
  console.log('New stores');
  next();
});

//READ featured Stores on GET
exports.store_featured = asyncHandler((req, res, next) => {
  // res.send("NOT IMPLEMENTED: Featured stores");
  console.log('Featured Stores');
  next();
})

//READ Store detail on GET
exports.store_detail = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id);
  res.render("store", { store });
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