const express = require('express');
const router = express.Router();
const users = require('../data/user.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', users });
});

module.exports = router;