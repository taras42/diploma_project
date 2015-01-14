define(function(require){

	var Backbone = require('backbone'),
		_ = require('underscore'),
		itemTemplate = require("text!components/common/item/template/itemTemplate.htm"),
		$ = require('jquery');

	var Item = Backbone.View.extend({

		el: function(){
			var self = this;
			return	_.template(itemTemplate)({
				additinalCssClass: self.additinalCssClass
			});
		},

		events: {
			"click": "select",
		},

		constructor: function(options){
			if(!options){
				throw 'itemTemplate option is required';
			}

			this.itemTemplate = options.itemTemplate;
			this.additinalCssClass = options.additinalCssClass || ""; 
			this.model = options.model || {};

			this.initialize();
		},

		initialize: function(){
			this.setElement(this.el());
		},

		render: function(){
			this.$el.html(_.template(this.itemTemplate)(this.model));
			return this;
		},

		select: function(event){
			this.trigger("select", this, event);
		}
		
	});

});