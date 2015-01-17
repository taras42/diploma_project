define(function(require){

	var _ = require("underscore"),
		$ = require('jquery'),
		itemCollectionTemplate = require("text!components/common/itemCollection/template/itemCollectionTemplate.htm"),
		Item = require("components/common/item/Item"),
		Backbone = require('backbone');

	var ItemCollection = Backbone.View.extend({

		events: {
			"click": "itemSelect"
		},

		el: function(){
			var self = this;
			return	_.template(itemCollectionTemplate)({
				additionalCssClass: self.additionalCssClass
			});
		},

		constructor: function(options){
			this.model = options.model || Backbone.Model;
			this.items = options.items || {};
			this.itemTemplate = options.itemTemplate;
			this.additionalCssClass = options.additionalCssClass || ""
			this.itemAdditionalCssClass = options.itemAdditionalCssClass || ""

			this.itemsCollection = [];

			this.initialize();
		},

		initialize: function(){
			var self = this;

			this.itemsCollection = _.map(this.items, function(item){

				var model = new self.model(item); 

				var itemView = new Item({
					model: model,
					itemTemplate: self.itemTemplate,
					additionalCssClass: self.itemAdditionalCssClass		
				});

				return itemView;
			});

			this.setElement(this.el());
		},

		addItem: function(){

		},

		removeItem: function(){

		},

		renderItem: function(){

		},

		itemSelect: function(e){
			var target = $(e.target);
			var itemId = target.parent("div[item-id]").attr("item-id") || target.attr("item-id");

			var itemView = _.find(this.itemsCollection, function(itemView){
				return itemView.model.cid === itemId;
			});

			itemView && this.trigger("item:selected", itemView, itemView.model);
		},

		itemEvent: function(e){
			//this.trigger('itemEvent', item);
		},

		render: function(){
			var self = this;

			_.each(this.itemsCollection, function(item){
				self.$el.append(item.render().$el);
			});

			return this;
		}

	});

	return ItemCollection;

});