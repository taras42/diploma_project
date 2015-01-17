define(function(require){

	var Backbone = require('backbone'),
		_ = require('underscore'),
		itemTemplate = require("text!components/common/item/template/itemTemplate.htm"),
		$ = require('jquery');

	var Item = Backbone.View.extend({

		el: function(){
			var self = this;
			return	_.template(itemTemplate)({
				additionalCssClass: self.additionalCssClass
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
			this.additionalCssClass = options.additionalCssClass || ""; 
			this.model = options.model || new Backbone.Model();

			this.initialize();
		},

		initialize: function(){
			this.setElement(this.el());
		},

		render: function(){
			this.$el.html(_.template(this.itemTemplate)({model: this.model.toJSON()}));
			return this;
		},

		select: function(event){
			this.trigger("select", this, event);
		}
		
	});

	return Item;

});