const express = require('express');
const router = express.Router();
const fees_controller = require('../controllers/feesController');

router.get('/fees', fees_controller.fees_list);
router.get('/fees/create-new', fees_controller.fees_create_get);
router.post('/fees/create-new', fees_controller.fees_create_post);
router.get('/fees/:id/edit', fees_controller.fees_update_get);
router.post('/fees/:id/edit', fees_controller.fees_update_post);
router.get('/fees/:id', fees_controller.fees_detail);

module.exports = router;
