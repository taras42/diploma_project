define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		boardSideBarTemplate = require("text!components/board/boardSideBar/boardSideBarTemplate.htm");


	var BoardSideBar = Backbone.View.extend({
		el: boardSideBarTemplate,

		constructor: function(){

		},

		initialize: function(){

		},

		render: function(){
			
		}
	});

	return BoardSideBar;
});