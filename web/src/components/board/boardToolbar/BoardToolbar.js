define(function(require){

	var Backbone = require('backbone'),
		boardToolbarTemplate = require('text!components/board/boardToolbar/template/boardToolbarTemplate.htm');

	require("css!components/board/boardToolbar/css/boardToolbar.css");

	var BoardToolbar = new Backbone.View.extend({
		el: boardToolbarTemplate
	});

	return BoardToolbar;
});