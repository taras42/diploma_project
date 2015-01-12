define(function(require){

	var _ = require("underscore"),
		$ = require('jquery'),
		Backbone = require('backbone');


	var ItemCollection = Backbone.View.extend({

		constructor: function(options){
			if(!options || !options.model){
				throw 'Model is required';
			}

			this.model = options.model;
			this.itemTemplate = options.itemTemplate;
			this.additionalCssClass = options.additionalCssClass || ""
			this.itemAdditionalCssClass = options.itemAdditionalCssClass || ""
		},

		initialize: function(){
			this.items
		}

		render: function(){

		}

	});

});