const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexPageController');
const user_controller = require('../controllers/userController');
const store_controller = require("../controllers/storeController");

router.get("/browse_name", store_controller.store_list_alphabet);
router.get("/browse_category", store_controller.store_list_category);

router.all('/', user_controller.user_brief, index_controller.display_index);

module.exports = router;
