const express = require('express');
const router = express.Router();
const fees_controller = require('../controllers/feesController');
const admin_controller = require('../controllers/adminController');

// Display list of all fees.
router.get('/', fees_controller.fees_list);

// Display Fee create form on GET.
router.get('/create-new', admin_controller.is_admin, fees_controller.fees_create_get);

// Handle Fee create on POST.
router.post('/create-new', admin_controller.is_admin, fees_controller.fees_create_post);

// Display Fee update form on GET.
router.get('/:id/edit', admin_controller.is_admin, fees_controller.fees_update_get);

// Handle Fee update on POST.
router.post('/:id/edit', admin_controller.is_admin, fees_controller.fees_update_post);

// Display detail page for a specific Fee.
router.get('/:id', fees_controller.fees_detail);

module.exports = router;
