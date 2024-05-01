const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() });


router.get('/signin', user_controller.user_signin_get);

router.post('/signin/verify', user_controller.user_authenticate);

// router.post('/signout', user_controller.user_signout);

router.get('/signup', user_controller.user_create_get);

router.post('/signup', 
  upload.single('profile_image'), 
  user_controller.user_create_post
);

module.exports = router;