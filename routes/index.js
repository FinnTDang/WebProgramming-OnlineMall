const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const store_controller = require('../controllers/storeController');
const product_controller = require('../controllers/productController');
const cart_controller = require('../controllers/cartController');
const order_controller = require('../controllers/orderController');

router.get('/', 
  // user_controller.user_authenticate,
  user_controller.user_detail,
  store_controller.store_featured,
  store_controller.store_new,
  product_controller.product_featured,
  product_controller.product_new,
);

module.exports = router;
