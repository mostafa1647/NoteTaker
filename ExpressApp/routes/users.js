var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('You have sent a request to get the list of users');
});

module.exports = router;
