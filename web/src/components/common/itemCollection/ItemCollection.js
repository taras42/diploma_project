define(function(require){

	var _ = require("underscore"),
		$ = require('jquery'),
		itemCollectionTemplate = require("text!components/common/itemCollection/template/itemCollectionTemplate.htm"),
		Item = require("components/common/item/Item"),
		Backbone = require('backbone');

	var defaults = {
		eventPrefix: "item",
		eventSufix: "selected"
	};

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
			this.eventPrefix = options.eventPrefix || defaults.eventPrefix;
			this.itemTemplate = options.itemTemplate;
			this.additionalCssClass = options.additionalCssClass || ""
			this.itemAdditionalCssClass = options.itemAdditionalCssClass || ""

			this.itemsCollectionView = [];

			this.initialize();
		},

		initialize: function(){
			var self = this;

			this.itemsCollectionView = _.map(this.items, function(item){

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

		addItem: function(model){
			var self = this;

			var itemView = new Item({
				model: model,
				itemTemplate: self.itemTemplate,
				additionalCssClass: self.itemAdditionalCssClass		
			});

			this.itemsCollectionView.push(itemView);

			this.trigger("add:item", this, itemView);

			return itemView;
		},

		removeItem: function(){
			// TODO		
		},

		renderItem: function(itemView){
			this.$el.append(itemView.render().$el);
		},

		itemSelect: function(e){
			var target = $(e.target);
			var itemId = target.parent("div[item-id]").attr("item-id") || target.attr("item-id");

			var itemView = _.find(this.itemsCollectionView, function(itemView){
				return itemView.model.cid === itemId;
			});

			var eventSufix = (itemView && itemView.model.get('action')) || defaults.eventSufix;

			itemView && this.trigger(this.eventPrefix + ":" + eventSufix, itemView, itemView.model);
		},

		itemEvent: function(e){
			//this.trigger('itemEvent', item);
		},

		render: function(){
			var self = this;

			_.each(this.itemsCollectionView, function(item){
				self.renderItem(item);
			});

			return this;
		}

	});

	return ItemCollection;

});