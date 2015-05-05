define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		io = require("socket.io"),
		BoardSideBar = require("components/board/boardSideBar/BoardSideBar"),
		BoardCanvas = require("components/board/boardCanvas/BoardCanvas"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	require("css!components/board/css/board.css");
	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		initialize: function(){

			this.socket = io.connect();

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

			this.socket.on("connect", function(){
				console.log('connected');
			});

			this.socket.on("sensor:trigger", function(sensorData){
				var blinkCount = 0;

				console.log(sensorData);
				var itemView = self.boardCanvas.findSensorBySensorId(sensorData.data.remote64);

				if(itemView){
					var blink = setInterval(function(){
						blinkCount += 1;
						itemView.$el.toggleClass("hide");

						(blinkCount > 5) && clearInterval(blink);
					}, 1000);
				}
			});
		},

		_onItemSelect: function(sideBar, itemView){
			this.selectedControlledArea = itemView;
			this.boardCanvas.showControlledArea(itemView.model);
		},

		setCanvasWidth: function(){
			var canvasLeftBorderWidth = parseInt(this.boardCanvas.$el.css("borderLeftWidth"));
			this.boardCanvas.$el.css("width", this.$el.width() - this.sideBar.$el.outerWidth() - canvasLeftBorderWidth);
		},

		saveCA: function(){
			
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