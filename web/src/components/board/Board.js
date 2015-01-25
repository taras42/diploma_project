define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		BoardSideBar = require("components/board/boardSideBar/BoardSideBar"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	require("css!components/board/css/board.css");
	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		initialize: function(){
			this.sideBar = new BoardSideBar({
				parentElement: this.$el
			});
			this.render();
		},

		render: function(){
			$('body').append(this.$el);
			this.sideBar.render().show();
		},

		remove: function(){
			this.sideBar.remove();
			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});


	return Board;
});