define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		Item = require("components/common/item/Item"),
		ControlledAreaModel = require("components/board/model/ControlledAreaModel"),
		ItemCollection = require("components/common/itemCollection/ItemCollection"),
		boardSideBarTemplate = require("text!components/board/boardSideBar/template/boardSideBarTemplate.htm"),
		controlledAreaItemTemplate = require("text!components/board/template/controlledAreaItemTemplate.htm"),
		addCAButtonTemplate = require("text!components/board/boardSideBar/template/addCAButtonTemplate.htm");


	var BoardSideBar = Backbone.View.extend({
		el: boardSideBarTemplate,

		constructor: function(options){
			this.options = options;

			this.controlledAreasCollection = new ItemCollection({
				additinalCssClass: "controlledAreas",
				itemAdditionalCssClass: "controlledArea",
				itemTemplate: controlledAreaItemTemplate,
				model: ControlledAreaModel,
				items: options.items,
			});

			this.addCAButton = new Item({itemTemplate: addCAButtonTemplate});
			this.initialize();
		},

		initialize: function(){
			this.setElement(this.el);
		},

		render: function(){
			this.$el.find('.footer').html(this.addCAButton.render().$el);
		}
	});

	return BoardSideBar;
});