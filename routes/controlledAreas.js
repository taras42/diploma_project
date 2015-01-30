var express = require('express');
var router = express.Router();
var ControlledArea = require('../models').ControlledArea;

/* get ControlledAreas */

router.get('/', function(req, res) {
	ControlledArea.findAll().then(function(controlledAreas) {
    	res.send(controlledAreas);
  	});
});

module.exports = router;