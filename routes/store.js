const express = require('express');
const router = express.Router();
const store_controller = require('../controllers/storeController');
const multer  = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/stores/');
  },
  filename: function(req, file, cb) {
    const id = new mongoose.Types.ObjectId();
    req.id = id;
    cb(null, id.toString() + '.jpeg');
  }
});
const upload = multer({ storage: storage });

router.get('/stores', store_controller.store_list);

router.get('/stores/create', store_controller.store_create_get);

router.post('/stores/create', upload.single('store_logo'), store_controller.store_create_post);

router.get('/stores/:id', store_controller.store_page_get);

module.exports = router;