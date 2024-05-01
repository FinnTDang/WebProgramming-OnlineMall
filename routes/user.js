const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const cart_controller = require('../controllers/cartController');
const order_controller = require('../controllers/orderController');
const product_controller = require('../controllers/productController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() });




router.get('/signin', user_controller.user_signin_get);

router.post('/signin/verify', user_controller.user_authenticate);

router.get('/signup', user_controller.user_create_get);

router.post('/signup', upload.single('profile_image'), user_controller.user_create_post);

router.get('/signout', user_controller.user_signout);




router.all('/:user_id', user_controller.user_authenticate, user_controller.user_detail);

router.get('/:user_id/cart', user_controller.user_authenticate, cart_controller.cart_display);

router.put('/:user_id', user_controller.user_authenticate, cart_controller.cart_update);

router.post('/:user_id/order', 
  user_controller.user_authenticate, 
  order_controller.order_create,
  product_controller.product_update_post,
  cart_controller.cart_update, 
  order_controller.order_display);



  
module.exports = router;