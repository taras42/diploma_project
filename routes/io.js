var express = require('express');
var router = express.Router();

module.exports = function(io){
	
	router.post('/trigger', function(req, res) {
	    io.sockets.emit('sensor:trigger', req.body);
	    res.send('data: recieved');
	});

	return router;
};