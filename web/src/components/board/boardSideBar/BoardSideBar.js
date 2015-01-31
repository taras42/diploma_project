define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		Item = require("components/common/item/Item"),
		ControlledAreaModel = require("components/board/model/ControlledAreaModel"),
		ControlledAreasCollection = require("components/board/collection/ControlledAreasCollection"),
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

			this.addCAButton = new Item({itemTemplate: addCAButtonTemplate});

			this.controlledAreasViewCollection = new ItemCollection({
					additionalCssClass: "controlledAreas",
					itemAdditionalCssClass: "controlledArea",
					itemTemplate: controlledAreaItemTemplate,
					model: ControlledAreaModel,
					items: [],
			});
			
			Backbone.View.apply(this, arguments);
		},

		initialize: function(){

			this.content = this.$el.find(".content");
			this.header = this.$el.find(".header");
			this.footer = this.$el.find(".footer");

			this.initEvents();

			this.initControlledAreasCollection();
		},

		initEvents: function(){
			var self = this;

			this.listenTo(this.addCAButton, "select", this.showAddControlledAreaDialog);
			this.listenTo(this.controlledAreasViewCollection, "item:mouseenter item:mouseleave", this.toggleControlledAreaStyle);
			this.listenTo(this.controlledAreasViewCollection, "item:selected", this.selectControlledArea);

			$(window).on("resize", function(){
				self.setContentHeight();
			});
		},

		initControlledAreasCollection: function(){
			var self = this;

			this.controlledAreasCollection = new ControlledAreasCollection([]);

			this.controlledAreasCollection.fetch().then(function(collection, response){
				_.each(self.controlledAreasCollection.models, function(model){
					var item = self.controlledAreasViewCollection.addItem(model);
					self.controlledAreasViewCollection.renderItem(item);
				});
			});
		},

		addControlledArea: function(dialog, model){
			var self = this;

			this.controlledAreasCollection.add(model);

			var item = this.controlledAreasViewCollection.addItem(model);

			this.controlledAreasViewCollection.renderItem(item);

			model.save();
			self.addCADialog.hide().remove();	
		},

		selectControlledArea: function(itemView, itemModel){
			this.selectedControlledArea && this.selectedControlledArea.$el.removeClass("selected");

			this.selectedControlledArea  = itemView;

			this.selectedControlledArea.$el.addClass("selected");
		},

		toggleControlledAreaStyle: function(itemView, itemModel){
			itemView.$el.toggleClass("hovered");
		},

		setContentHeight: function(){
			var bodyHeight = $('body').height();

			this.content.css({
				"height": (bodyHeight - this.header.height() - this.footer.height()) + "px"
			});
		},

		showAddControlledAreaDialog: function(){
			this.addCADialog = new Dialog({
				buttons: [{title: "Add", action: "add", additionalCssClass: ""}, 
					{title: "Cancel", action: "cancel", additionalCssClass: ""}],
				model: new ControlledAreaModel(),
				content: addCADialogTemplate,
				modal: true,
				parentContainer: "#mainBoard",
				title: "Add new controlled area",
				additionalCssClass: "boardSideBarDialog" 
			});

			this.listenTo(this.addCADialog, "button:add", this.addControlledArea);
			this.listenTo(this.addCADialog, "button:cancel", this.removeAddControlledAreaDialog);

			this.addCADialog.render().show();
		},

		removeAddControlledAreaDialog: function(dialog){
			this.addCADialog.hide().remove();
		},

		render: function(){
			this.content.append(this.controlledAreasViewCollection.render().$el);
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