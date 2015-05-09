var express = require('express');
var router = express.Router();
var ControlledArea = require('../models').ControlledArea;
var utils = require('../helpers/utils');
var settings = require('../helpers/settings');
var Sensor = require('../models').Sensor;
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/* create ControlledArea */

router.post('/', function(req, res) {
	var controlledAreaObj = req.body,
		imageName = utils.generateImageName(controlledArea.id, "png"),
		sensorsObjects = controlledAreaObj.sensors,
		base64Data = controlledAreaObj.base64Image && utils.getBase64Data(controlledAreaObj.base64Image);
		imagePath = settings.IMAGE_PATH + "/" + imageName;

	controlledAreaObj.image = base64Data && imagePath;
  
	ControlledArea.create(_.omit(controlledAreaObj, ["base64Image", "sensors"])).then(function(controlledArea){
		if (base64Data) {
			fs.writeFile(path.resolve(settings.PUBLIC_FOLDER + imagePath), base64Data, 'base64', function(err) {
				if (err) {
					res.send("Error");
					return;	
				}

				if (sensorsObjects) {
					var sensors = _.map(sensorsObjects, function(sensor){
						sensor.ControlledAreaId = controlledArea.id;
						return sensor;
					});

					Sensor.bulkCreate(sensors).then(function() {
						Sensor.find({where: {"ControlledAreaId": controlledArea.id}}).then(function(sensors) {
							sensors = _.isArray(sensors) ? sensors : [sensors];

							controlledArea.setSensors(sensors).then(function(){
								controlledArea.getSensors().then(function(associatedSensors){
									res.send("Ok");
								});
							});
						});
					});

				} else {
					res.send("Ok");
				}
			});
		} else {
			res.send("Ok");
		}
	});
});

/* update ControlledArea */

router.put('/', function(req, res) {
  var controlledAreaObj = req.body;

  ControlledArea.find(controlledAreaObj.id).then(function(controlledArea){
	var base64Data = controlledAreaObj.base64Image.replace(/^data:image\/png;base64,/, "");
	
	controlledArea.updateAttributes(_.omit(controlledAreaObj, ["base64Image", "sensors"])).then(function(){
		// var sensors = _.map(controlledAreaObj.sensors, function(sensor){
		// 	var sensor = Sensor.build(sensor);
		// 	sensor.setControlledArea(controlledArea);
		// 	sensor.save();
		// 	return sensor;
		// });

		console.log(__dirname);

		var imagePath = path.resolve("./public/images/controlledAreas/test.png");

		fs.writeFile(imagePath, base64Data, 'base64', function(err) {
			!err ? res.send(controlledArea) : res.send();
		});

		// Sensor.create(controlledAreaObj.sensors[0]).then(function(sensor){
		// 	sensor.setControlledArea(controlledArea);
		// 	controlledArea.addSensor(sensor).then(function(){
				
		// 	});
		// });
	});
  });
});

/* edit ControlledArea */

router.post('/edit', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

module.exports = router;