var express = require('express');
var router = express.Router();

module.exports = function(io){
	
	router.get('/trigger', function(req, res) {
	 	console.log(io);

	    io.sockets.emit('triggers_sensors_data', {id: 123});

	    res.send('io');
	});

	return router;
};