const Product = require("../models/product");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");

//Display Index
exports.display_index = asyncHandler(async (req, res, next) => {
  // const new_stores;
  // const new_products;
  // const featured_stores;
  // const featured_products;
  const new_stores = [
    { url: "/store-1", logo: "/logo1.png", name: "Store One" },
    { url: "/store-2", logo: "/logo2.png", name: "Store Two" }
  ];

  const new_products = [
    { url: "/product-1", image: "/image1.png", name: "Product One", store_url: "/store-1", store_name: "Store One", price: "$19.99" },
    { url: "/product-2", image: "/image2.png", name: "Product Two", store_url: "/store-2", store_name: "Store Two", price: "$29.99" }
  ];

  const featured_stores = [
    { url: "/store-1", logo: "/logo1.png", name: "Store One" },
    { url: "/store-2", logo: "/logo2.png", name: "Store Two" }
  ];

  const featured_products = [
    { url: "/product-1", image: "/image1.png", name: "Product One", store_url: "/store-1", store_name: "Store One", price: "$19.99" },
    { url: "/product-2", image: "/image2.png", name: "Product Two", store_url: "/store-2", store_name: "Store Two", price: "$29.99" }
  ];

  res.render('index', { 
    new_stores: new_stores, 
    new_products: new_products,
    featured_stores: featured_stores,
    featured_products: featured_products
  }); 
  
  // res.render("index");
});

