var express = require('express');
var router = express.Router();
var Sensor = require('../models').Sensor;
var net = require('net');

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

router.post('/trigger', function(req, res) {
  console.log(req.body.data);
  res.send('recieved');
});

module.exports = router;
