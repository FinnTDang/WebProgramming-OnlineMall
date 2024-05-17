const express = require('express');
const router = express.Router();
const store_controller = require('../controllers/storeController');
const product_controller = require('../controllers/productController');
const multer  = require('multer');
const mongoose = require('mongoose');

const store_storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/stores/');
  },
  filename: function(req, file, cb) {
    const id = new mongoose.Types.ObjectId();
    req.id = id;
    cb(null, id.toString() + '.jpeg');
  }
});
const product_storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/products/');
  },
  filename: function(req, file, cb) {
    const id = new mongoose.Types.ObjectId();
    req.id = id;
    cb(null, id.toString() + '.jpeg');
  }
});
const store_upload = multer({ storage: store_storage });
const product_upload = multer({ storage: product_storage });


router.get('/stores', store_controller.store_list);

router.get('/stores/create', store_controller.store_create_get);

router.post('/stores/create', store_upload.single('store_logo'), store_controller.store_create_post);

router.get('/stores/:id', store_controller.store_page_get);

router.get('/stores/:id/products', store_controller.all_products);

router.get('/stores/:id/products/create', product_controller.product_create_get);

router.post('/stores/:id/products/create', product_upload.single('product_image'),  product_controller.product_create_post);

router.get('/stores/:store_id/products/:product_id', product_controller.product_detail);

module.exports = router;

