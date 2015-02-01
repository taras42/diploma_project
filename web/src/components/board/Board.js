define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		BoardSideBar = require("components/board/boardSideBar/BoardSideBar"),
		BoardCanvas = require("components/board/boardCanvas/BoardCanvas"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	require("css!components/board/css/board.css");
	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		initialize: function(){

			this.sideBar = new BoardSideBar({
				parentElement: this.$el
			});

			this.boardCanvas = new BoardCanvas({
				parentElement: this.$el
			});

			this.initEvents();

			this.render();
		},

		initEvents: function(){
			var self = this;

			this.listenTo(this.sideBar, "item:select", this._onItemSelect);

			$(window).on("resize", function(){
				self.setCanvasWidth();
			});
		},

		_onItemSelect: function(sideBar, itemView){
			this.selectedControlledArea = itemView;
			this.boardCanvas.showControlledArea(itemView.model);
		},

		setCanvasWidth: function(){
			var canvasLeftBorderWidth = parseInt(this.boardCanvas.$el.css("borderLeftWidth"));
			this.boardCanvas.$el.css("width", $('body').width() - this.sideBar.$el.outerWidth() - canvasLeftBorderWidth);
		},

		renderCanvas: function(){
			this.boardCanvas.render();
			this.setCanvasWidth();
			this.boardCanvas.show();
		},

		render: function(){
			$('body').append(this.$el);
			this.sideBar.render().show();
			this.renderCanvas();
		},

		remove: function(){
			$(window).off('resize');
			this.sideBar.remove();
			this.boardCanvas.remove();
			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});


	return Board;
});