var express = require('express');
var router = express.Router();
var Sensor = require('../models/sensor');

/* add sensor */

router.post('/add', function(req, res) {
  res.send('respond with a resource for sensors');
});

/* remove sensor */

router.post('/remove', function(req, res) {
  res.send('respond with a resource for sensors');
});

/* edit sensor */

router.post('/edit', function(req, res) {
  res.send('respond with a resource for sensors');
});

module.exports = router;
