const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const order_controller = require('../controllers/orderController');
const product_controller = require('../controllers/productController');
const multer  = require('multer');
const mongoose = require('mongoose');
const fs = require('node:fs');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/users/');
  },
  filename: function(req, file, cb) {
    if (req.path == "/users/" + req.params.id + "/update") {
      fs.rm(`public/images/users/${req.params.id}.jpeg`, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Update successful");
        cb(null, req.params.id + '.jpeg');
      })
    } else {
      const id = new mongoose.Types.ObjectId();
      req.id = id;
      cb(null, id.toString() + '.jpeg');
    } 
  }
});
const upload = multer({ storage: storage });


router.get('/signin', user_controller.user_signin_get);

router.post('/signin', user_controller.user_signin_post);

router.get('/signup', user_controller.user_create_get);

router.post('/signup', upload.single('profile_image'), user_controller.user_create_post);

router.get('/signout', user_controller.user_signout);

router.all('/users/*', user_controller.user_authenticate);

router.get('/account', user_controller.user_detail);

router.get('/users/:id/update', user_controller.user_info_update_get);

router.post('/users/:id/update', upload.single('profile_image'), user_controller.user_info_update_post);

router.get('/account/business', user_controller.business_detail);

router.get('/account/business/update', user_controller.business_detail_update_get);

router.post('/account/business/update', upload.single('store_logo'), user_controller.business_detail_update_post);

router.get('/cart', user_controller.user_cart_get);

router.post('/cart', user_controller.user_cart_add_post);

router.get('/reset-password', user_controller.user_password_reset_get);

router.post('/reset-password', user_controller.user_password_reset_post);

router.get('/reset-password/:mail', user_controller.get_bridge);

router.get('/reset-password/:mail/:code', user_controller.password_change_get);

router.post('/reset-password/:mail/:code', user_controller.password_change_post);

router.post('/cart/item-delete', user_controller.user_cart_update_post);

router.post('/cart/item-update', user_controller.user_cart_update_post);

router.post('/checkout', user_controller.checkout_post);

// router.get('/order', user_controller.user_order_get);

router.post('/wishlist', user_controller.user_wishlist_post);

router.get('/wishlist', user_controller.user_wishlist_get);

router.get('/orders', order_controller.orders_display);

router.post('/successful_order', order_controller.order_create);

router.get('/successful_order', order_controller.successful_order_display);

module.exports = router;