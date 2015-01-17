define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		BoardSideBar = require("components/board/boardSideBar/BoardSideBar"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		constructor: function(options){
			this.initialize();
		},

		initialize: function(){
			this.sideBar = new BoardSideBar()
			this.setElement(this.el);
		},

		render: function(){
			$('body').append(this.el);
		},

		remove: function(){
			// nothing yet
		}

	});


	return Board;
});