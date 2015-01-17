define(function(require){

	var _ = require("underscore"),
		$ = require('jquery'),
		itemCollection = require("text!components/common/itemCollection/template/itemCollectionTemplate.htm"),
		Item = require("components/common/item/Item"),
		Backbone = require('backbone');


	var ItemCollection = Backbone.View.extend({

		events: {
			"click": "select"
		},

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

			this.itemsCollection = new Backbone.Collection();

			this.initialize();
		},

		initialize: function(){
			var self = this;

			this.itemsCollection.add(_.map(this.items, function(item){

				var model = new self.model(item); 

				var itemView = new Item({
					model: model,
					itemTemplate: self.itemTemplate,
					itemAdditionalCssClass: self.itemAdditionalCssClass		
				});

				return itemView;
			}));

			this.itemsCollection.on("select", self.itemSelect);

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
			var targetId = target.attr("item-id");


		},

		itemEvent: function(e){
			//this.trigger('itemEvent', item);
		},

		render: function(){
			var itemsHtml = itemsCollection.map(function(item){
				return item.render().$el.html();
			}).join();

			this.$el.html(itemsHtml);
		}

	});

});