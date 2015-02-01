define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore");

	var ControlledAreaModel = Backbone.Model.extend({
		defaults: {
			image: "",
			description: "",
			title: "",
			sensors: []
		},
		url: "/controlledArea"
	});

	return ControlledAreaModel;
});