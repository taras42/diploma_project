define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore");

	var ControlledAreaModel = Backbone.Model.extend({
		defaults: {
			path: "",
			description: "",
			title: "",
			sensors: []
		},

		toJSON: function(){
			var id = this.id,
				attrs = this.toJSON();

			return _.extend({}, attrs, {id: id});
		}
	});

	return ControlledAreaModel;
});