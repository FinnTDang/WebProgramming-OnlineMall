const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() });

router.get('/login', );

router.post('/login/password',);

router.post('/logout', );

router.get('/signup', user_controller.user_create_get);

router.post('/signup', upload.single('profile_image'), user_controller.user_create_post);

module.exports = router;