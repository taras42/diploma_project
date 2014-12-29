var express = require('express');
var router = express.Router();
var ControlledArea = require('../models').ControlledArea;

/* add sensor */

router.post('/add', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

/* remove sensor */

router.post('/remove', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

/* edit sensor */

router.post('/edit', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

module.exports = router;