var express = require('express');
var router = express.Router();
var ControlledArea = require('../models').ControlledArea;

/* add ControlledArea */

router.post('/', function(req, res) {
  var controlledArea = req.body;
  ControlledArea.create(controlledArea);
});

/* remove ControlledArea */

router.post('/remove', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

/* edit ControlledArea */

router.post('/edit', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

module.exports = router;