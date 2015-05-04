define(function (require){

	var Backbone = require("backbone");

	var SensorModel = Backbone.Model.extend({
		defaults: {
			type: "",
			x: 0,
			y: 0,
			description: "",
			title: "",
			sensor_id: ""
		}
	});

	return SensorModel;

});