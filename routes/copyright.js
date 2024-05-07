const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('copyright', { title: 'Copyright' });
});

module.exports = router;
