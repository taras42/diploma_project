define(function(require){

	var _ = require("underscore"),
		$ = require('jquery'),
		itemCollection = require("text!components/common/itemCollection/template/itemCollectionTemplate.htm"),
		Backbone = require('backbone');


	var ItemCollection = Backbone.View.extend({

		el: function(){
			var self = this;
			return	_.template(itemTemplate)({
				additinalCssClass: self.additinalCssClass
			});
		},

		constructor: function(options){
			if(!options || !options.model){
				throw 'Model is required';
			}

			this.model = options.model;
			this.items = options.items || {};
			this.itemTemplate = options.itemTemplate;
			this.additionalCssClass = options.additionalCssClass || ""
			this.itemAdditionalCssClass = options.itemAdditionalCssClass || ""

			this.initialize();
		},

		initialize: function(){
			var self = this.model;

			this.itemsCollection = Backbone.Collection.extend(this.items, {
				model: self.model
			});

			this.setElement(this.el());
		},

		addItem: function(){

		},

		removeItem: function(){

		},

		renderItem: function(){

		},

		render: function(){
			var itemsHtml = itemsCollection.map(function(item){
				return item.render().$el.html();
			}).join();

			this.$el.html(itemsHtml);
		}

	});

});