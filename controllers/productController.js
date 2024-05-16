const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display all Products on GET
exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.render("product_list", { products });
});

//READ featured Products on GET
exports.product_featured = asyncHandler(async (req, res, next) => {
  console.log('Featured products');
  next();
});

//READ new Products on GET
exports.product_new = asyncHandler(async (req, res, next) => {
  console.log('New products');
  next();
});

/**Featured and new Products, depending on the request head, will display it mall-wise or store-wise */
const mongoose = require("mongoose");

//READ Product detail on GET
exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.product_id }).exec();
  const store = await Store.findOne({ _id: product.store }).exec();

  res.render('product_detail', { product: product, store: store});
});

//READ Product create-form on GET
exports.product_create_get= asyncHandler(async (req, res, next) => {
  res.render("add_product", { title: "Adding product", store_id: req.params.id });
});

//CREATE Product on POST
exports.product_create_post = asyncHandler(async (req, res, next) => {
  const new_product = new Product({
    _id: req.id,
    name: req.body.product_name,
    store: req.params.id,
    price: parseInt(req.body.product_price),
    quantity: parseInt(req.body.product_quantity),
    description: req.body.product_description,
    image: '/images/products/' + req.id.toString() + '.jpeg'
  });
  await new_product.save();

  const products_store = await Store.findById(new_product.store).exec();
  products_store.products.push(new_product);
  await products_store.save();
  
  console.log(products_store.products);

  res.redirect(`/stores/${req.params.id}/`);
});

//READ Product update-form on GET
exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update product form");
});

//UPDATE Product on POST
exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Update product");
});

//DELETE Product on POST
exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Delete product");
});

