define(function(require){

	var Backbone = require('backbone'),
		boardToolbarTemplate = require('text!components/board/boardToolbar/template/boardToolbarTemplate.htm');

	require("css!components/board/boardToolbar/css/boardToolbar.css");

	var BoardToolbar = Backbone.View.extend({
		el: boardToolbarTemplate,

		constructor: function(options){
			this.options = options;

			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

			Backbone.View.apply(this, arguments);
		},

		render: function(){
			this.parentElement.append(this.$el);

			return this;
		}
	});

	return BoardToolbar;
});