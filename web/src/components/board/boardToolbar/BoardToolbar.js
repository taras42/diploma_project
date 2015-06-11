define(function(require){

	var Backbone = require('backbone'),
		ItemCollection = require('components/common/itemCollection/ItemCollection'),
		boardToolbarButtonTemplate = require('text!components/board/boardToolbar/template/boardToolbarButtonTemplate.htm');
		boardToolbarTemplate = require('text!components/board/boardToolbar/template/boardToolbarTemplate.htm');

	require("css!components/board/boardToolbar/css/boardToolbar.css");

	var BoardToolbar = Backbone.View.extend({
		el: boardToolbarTemplate,

		constructor: function(options){
			this.options = options;

			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

			Backbone.View.apply(this, arguments);
		},

		initialize: function(){
			this.eventPrefix = "button";

			this.buttons = new ItemCollection({
				additionalCssClass: "toolbarButtons",
				itemAdditionalCssClass: "toolbarButton button",
				itemTemplate: boardToolbarButtonTemplate,
				items: [
					{
						title: "Delete",
						action: "delete"
					},
					{
						title: "Save",
						action: "save"
					},
					{
						title: "Settings",
						action: "settings"
					},
					{
						title: "Statistics",
						action: "statistics"
					}
				]
			});

			this.initEvents();
		},

		initEvents: function(){
			var self = this;

			this.listenTo(this.buttons, "item:selected", function(buttonView, buttonModel){
				self.trigger(self.eventPrefix + ":" + buttonModel.get("action"), self, buttonView);
			});
		},

		render: function(){
			this.$el.append(this.buttons.render().$el);
			this.parentElement.append(this.$el);

			return this;
		}
	});

	return BoardToolbar;
});