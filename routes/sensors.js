var express = require('express');
var router = express.Router();

/* GET sensors listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
