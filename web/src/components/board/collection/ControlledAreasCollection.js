define(function(require) {
	

	var Backbone = require("backbone"),
		ControlledAreaModel = require("components/board/model/ControlledAreaModel");


	var ControlledAreasCollection = Backbone.Collection.extend({
		model: ControlledAreaModel,
		url: "/controlledAreas"
	});

	return ControlledAreasCollection;

});