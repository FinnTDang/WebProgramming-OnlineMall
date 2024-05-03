const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexPageController');
const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_brief, index_controller.display_index);

router.all('*', user_controller.user_brief)

module.exports = router;
