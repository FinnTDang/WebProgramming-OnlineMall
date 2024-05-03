const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const cart_controller = require('../controllers/cartController');
const order_controller = require('../controllers/orderController');
const product_controller = require('../controllers/productController');
const multer  = require('multer');
const mongoose = require('mongoose');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/users/');
  },
  filename: function(req, file, cb) {
    const id = new mongoose.Types.ObjectId();
    req.id = id;
    cb(null, id.toString() + '.jpeg'); 
  }
});
const upload = multer({ storage: storage });


router.get('/signin', user_controller.user_signin_get);

router.post('/signin', user_controller.user_signin_post);

router.get('/signup', user_controller.user_create_get);

router.post('/signup', upload.single('profile_image'), user_controller.user_create_post);

router.get('/signout', user_controller.user_signout);

router.get('/users/:id', user_controller.user_detail);

router.get('/cart', user_controller.user_authenticate, cart_controller.cart_display);

router.put('/:user_id', cart_controller.cart_update);

router.post('/:user_id/order',
  order_controller.order_create,
  product_controller.product_update_post,
  cart_controller.cart_update, 
  order_controller.order_display);



  
module.exports = router;