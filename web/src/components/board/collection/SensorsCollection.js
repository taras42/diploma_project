define(function (require){

	var Backbone = require("backbone"),
		SensorModel = require("components/board/model/SensorModel");


	var SensorsCollection = Backbone.Collection.extend({
		model: SensorModel
	});

	return SensorsCollection;

});