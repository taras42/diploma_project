var express = require('express');
var router = express.Router();
var Sensor = require('../models').Sensor;
var ControlledArea = require('../models').ControlledArea;

/* get ControlledAreas */

router.get('/', function(req, res) {
	ControlledArea.findAll({include: [{ model: Sensor, as: 'sensors' }]}).then(function(controlledAreas) {
    	res.send(controlledAreas);
  	});
});

module.exports = router;