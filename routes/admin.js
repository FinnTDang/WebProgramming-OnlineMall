const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/adminController');

router.get('/administrators', admin_controller.admin_list);
router.get('/administrators/create-new', admin_controller.admin_create_get);
router.post('/administrators/create-new', admin_controller.admin_create_post);
router.get('/administrators/:id/edit', admin_controller.admin_update_get);
router.post('/administrators/:id/edit', admin_controller.admin_update_post);
router.get('/administrators/:id', admin_controller.admin_detail);

module.exports = router;
