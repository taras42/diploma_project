define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore");

	var ControlledAreaModel = Backbone.Model.extend({
		defaults: {
			image: "",
			base64Image: "",
			description: "",
			title: "",
			sensors: []
		},
		url: "/controlledArea",

		addSensor: function(sensorModel){
			this.get("sensors").push(sensorModel.toJSON());
		}
	});

	return ControlledAreaModel;
});