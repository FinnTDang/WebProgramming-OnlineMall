const Store = require("../models/product");
const asyncHandler = require("express-async-handler");

//READ all Stores alphabetically on GET
exports.store_list_alphabet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Store list by alphabet");
});

//READ all Stores by category on GET
exports.store_list_category = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Store list by category");
});

//READ new Stores on GET
exports.store_new = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: New stores");
});

//READ featured Stores on GET
exports.store_featured = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED: Featured stores");
})

//READ Store detail on GET
exports.product_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Store detail: ${req.params.id}`);
});

//READ Store create-form on GET
exports.product_create_get= asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create store form");
});

//CREATE Store on POST
exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create Store");
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