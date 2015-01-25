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

			this.perentElement = options.parentElement ?  $(options.parentElement) : $('body');

			this.controlledAreasCollection = new ItemCollection({
				additionalCssClass: "controlledAreas",
				itemAdditionalCssClass: "controlledArea",
				itemTemplate: controlledAreaItemTemplate,
				model: ControlledAreaModel,
				items: [{path: "my path", description: "my desc", title: "my title", id: 1}],
			});

			this.addCAButton = new Item({itemTemplate: addCAButtonTemplate});
			
			Backbone.View.apply(this, arguments);
		},

		initialize: function(){

			this.content = this.$el.find(".content");
			this.header = this.$el.find(".header");
			this.footer = this.$el.find(".footer");

			this.initEvents();
		},

		initEvents: function(){
			var self = this;

			this.listenTo(this.addCAButton, "select", this.showAddControlledAreaDialog);

			$(window).on("resize", function(){
				self.setContentHeight();
			});
		},

		addControlledArea: function(dialog, model){
			var collection = this.controlledAreasCollection;
			var item = collection.addItem(model);

			collection.renderItem(item);

			this.addCADialog.hide().remove();
		},

		setContentHeight: function(){
			var bodyHeight = $('body').height();

			this.content.css({
				"height": (bodyHeight - this.header.height() - this.footer.height()) + "px"
			});
		},

		showAddControlledAreaDialog: function(){
			this.addCADialog = new Dialog({
				buttons: [{title: "Save", action: "save", additionalCssClass: ""}, 
					{title: "Cancel", action: "cancel", additionalCssClass: ""}],
				model: new ControlledAreaModel(),
				content: addCADialogTemplate,
				modal: true,
				parentContainer: "#mainBoard",
				title: "Add new controlled area",
				additionalCssClass: "boardSideBarDialog" 
			});

			this.listenTo(this.addCADialog, "button:save", this.addControlledArea);
			this.listenTo(this.addCADialog, "button:cancel", this.removeAddControlledAreaDialog);

			this.addCADialog.render().show();
		},

		removeAddControlledAreaDialog: function(dialog){
			this.addCADialog.hide().remove();
		},

		render: function(){
			this.content.append(this.controlledAreasCollection.render().$el);
			this.footer.append(this.addCAButton.render().$el);

			this.perentElement.append(this.$el);

			return this;
		},

		show: function(){
			this.setContentHeight();
			this.$el.show();
		},

		remove: function(){
			$(window).off("resize");

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});

	return BoardSideBar;
});