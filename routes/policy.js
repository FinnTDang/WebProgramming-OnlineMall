const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('policy', { title: 'Policy' });
});

module.exports = router;
