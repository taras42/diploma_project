define(function(require){

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery');

	var Item = Backbone.View.extend({

		events: {
			"click": "select",
			"change": "change"
		},

		constructor: function(options){
			if(!options){
				throw 'Template option is required';
			}

			this.template = options.template;
			this.model = options.model;

			this.initialize();
		},

		initialize: function(){
			this.setElement(this.el);
		},

		render: function(){

		},

		remove: function(){

		},

		select: function(event){
			this.trigger("select", this, event);
		},

		change: function(event){
			this.trigger("select", this, event);
		}
		
	});

});