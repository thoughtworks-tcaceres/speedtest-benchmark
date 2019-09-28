const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../bin/helpers/middleware');

router.get('/', isLoggedIn, (req, res) => {
  res.render('results');
});

module.exports = router;
