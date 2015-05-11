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
		imageName = utils.generateImageName("png"),
		sensorsObjects = controlledAreaObj.sensors,
		base64Data = controlledAreaObj.base64Image && utils.getBase64Data(controlledAreaObj.base64Image);
		imagePath = settings.IMAGE_PATH + "/" + imageName;

	controlledAreaObj.image = base64Data && imagePath;
  
	ControlledArea.create(_.omit(controlledAreaObj, ["base64Image", "sensors"])).then(function(controlledArea){
		if (base64Data) {
			fs.writeFile(path.resolve(settings.PUBLIC_FOLDER + imagePath), base64Data, 'base64', function(err) {
				if (err) {
					res.status(500).send(err);
					return;	
				}

				if (sensorsObjects) {
					var sensors = _.map(sensorsObjects, function(sensor){
						return _.extend({}, sensor, {controlledAreaId: controlledArea.id});
					});

					Sensor.bulkCreate(sensors).then(function() {
						Sensor.find({where: {"controlledAreaId": controlledArea.id}}).then(function(sensors) {
							sensors = _.isArray(sensors) ? sensors : [sensors];

							controlledArea.setSensors(sensors).then(function(){
								controlledArea.getSensors().then(function(associatedSensors){
									var sensorsJSON = _.map(associatedSensors, function(sensor){
										return sensor.toJSON();
									});

									var controlledAreaJSON = _.extend({}, controlledArea.toJSON(), {sensors: sensorsJSON});

									res.send(controlledAreaJSON);
								});
							});
						});
					});

				} else {
					res.send(controlledArea.toJSON());
				}
			});
		} else {
			res.send(controlledArea.toJSON());
		}
	});
});

/* update ControlledArea */

router.put('/', function(req, res) {
	var controlledAreaObj = req.body,
  		base64Data = controlledAreaObj.base64Image && utils.getBase64Data(controlledAreaObj.base64Image);

	ControlledArea.find(controlledAreaObj.id).then(function(controlledArea){
		controlledArea.updateAttributes(_.omit(controlledAreaObj, ["base64Image", "sensors"])).then(function(){});
	});
});

/* edit ControlledArea */

router.post('/edit', function(req, res) {
  res.send('respond with a resource for ControlledArea');
});

module.exports = router;