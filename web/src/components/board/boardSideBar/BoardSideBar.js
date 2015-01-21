define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		Item = require("components/common/item/Item"),
		ControlledAreaModel = require("components/board/model/ControlledAreaModel"),
		Dialog = require("components/common/dialog/Dialog"),
		ItemCollection = require("components/common/itemCollection/ItemCollection"),
		boardSideBarTemplate = require("text!components/board/boardSideBar/template/boardSideBarTemplate.htm"),
		controlledAreaItemTemplate = require("text!components/board/boardSideBar/template/controlledAreaItemTemplate.htm"),
		addCAButtonTemplate = require("text!components/board/boardSideBar/template/addCAButtonTemplate.htm"),
		addCADialogTemplate = require("text!components/board/boardSideBar/template/addCADialogTemplate.htm");

	require('css!components/board/boardSideBar/css/boardSideBar.css');

	var BoardSideBar = Backbone.View.extend({

		el: boardSideBarTemplate,

		constructor: function(options){
			this.options = options;

			this.controlledAreasCollection = new ItemCollection({
				additionalCssClass: "controlledAreas",
				itemAdditionalCssClass: "controlledArea",
				itemTemplate: controlledAreaItemTemplate,
				model: ControlledAreaModel,
				items: [{path: "my path", description: "my desc", title: "my title", id: 1}],
			});

			this.addCAButton = new Item({itemTemplate: addCAButtonTemplate});

			this.addCADialog = new Dialog({
				buttons: [{title: "Save", action: "save"}],
				model: new ControlledAreaModel(),
				content: addCADialogTemplate 
			});
			
			Backbone.View.apply(this, arguments);
		},

		initialize: function(){
			this.initEvents();
		},

		initEvents: function(){
			this.listenTo(this.addCAButton, "select", this.showAddControlledAreaDialog);
			this.listenTo(this.addCADialog, "button:save", this.addControlledArea);
		},

		addControlledArea: function(dialog, model){
			var collection = this.controlledAreasCollection;
			var item = collection.addItem(model);

			collection.renderItem(item);

			this.addCADialog.hide();
			this.addCADialog.setModel(new ControlledAreaModel());
			this.addCADialog.refresh();
		},

		showAddControlledAreaDialog: function(){
			this.addCADialog.render().show();
		},

		render: function(){
			this.$el.find('.content').append(this.controlledAreasCollection.render().$el);
			this.$el.find('.footer').append(this.addCAButton.render().$el);

			return this;
		}
	});

	return BoardSideBar;
});