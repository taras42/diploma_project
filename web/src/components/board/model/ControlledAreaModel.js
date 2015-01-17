define(function(require){

	var Backbone = require("backbone");

	var ControlledAreaModel = Backbone.Model.extend({
		defaults: {
			path: "",
			description: "",
			title: "",
			sensors: []
		}
	});

	return ControlledAreaModel;
});