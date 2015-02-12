define(function (require) {

	var Backbone = require("backbone");

	var CellModel = Backbone.Model.extend({
		defaults: {
			x: 0,
			y: 0,
			resolution: 50
		}
	});

	return CellModel;

});