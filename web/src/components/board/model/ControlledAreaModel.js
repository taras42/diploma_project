define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore");

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