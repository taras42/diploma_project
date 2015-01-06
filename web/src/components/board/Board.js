define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		constructor: function(options){
			this.initialize();
		},

		initialize: function(){
			this.setElement(this.el);
		},

		render: function(){
			$('body').append(this.el);
		},

		remove: function(){

		}

	});


	return Board;
});