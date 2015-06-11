define(function(require){

	var Backbone = require("backbone"),
		_ = require("underscore"),
		$  = require("jquery"),
		io = require("socket.io"),
		ControlledAreasCollection = require("components/board/collection/ControlledAreasCollection"),
		BoardSideBar = require("components/board/boardSideBar/BoardSideBar"),
		BoardCanvas = require("components/board/boardCanvas/BoardCanvas"),
		BoardToolbar = require("components/board/boardToolbar/BoardToolbar"),
		boardTemplate = require('text!components/board/template/boardTemplate.htm');

	require("css!components/board/css/board.css");
	
	var Board = Backbone.View.extend({

		el: boardTemplate,

		initialize: function(){
			var self = this,
				body = this.$el.find('.body');

			this.socket = io.connect();

			this.boardToolbar = new BoardToolbar({
				parentElement: body
			});

			this.sideBar = new BoardSideBar({
				parentElement: body
			});

			this.boardCanvas = new BoardCanvas({
				parentElement: body
			});

			this.initEvents();

			this.initControlledAreasCollection().then(function(collection, response){
				self.sideBar.setCollection(self.controlledAreasCollection);
			});

			this.render();
		},

		initEvents: function(){
			var self = this;

			this.listenTo(this.sideBar, "item:select", this._onItemSelect);
			this.listenTo(this.boardToolbar, "button:save", _.bind(this._onToolbarSave, this));
			this.listenTo(this.boardCanvas, "sensor:added", _.bind(this._onSensorAdded, this));
			this.listenTo(this.boardCanvas, "canvas:ready", _.bind(this._onCanvasReady, this));
			this.listenTo(this.boardCanvas, "canvas:preview", _.bind(this._onCanvasPreview, this));

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

		initControlledAreasCollection: function(){
			var self = this;

			this.controlledAreasCollection = new ControlledAreasCollection([]);

			return this.controlledAreasCollection.fetch();
		},

		_onCanvasReady: function(canvas, CAView){
			this.selectedControlledArea.model.set("base64Image", CAView.imageBase64);
		},

		_onCanvasPreview: function(canvas, CAView){
			this.selectedControlledArea.model.set("blobSrc", CAView.blobSrc);
		},

		_onItemSelect: function(sideBar, itemView){
			this.selectedControlledArea = itemView;
			this.boardCanvas.showControlledArea(itemView.model);
		},

		_onSensorAdded: function(sensorView){
			this.selectedControlledArea.model.addSensor(sensorView.model);
		},

		_onToolbarSave: function(toolbar, buttonView){
			this.selectedControlledArea && this.selectedControlledArea.model.save().done(function(data){
				console.log(data);
			}).fail(function(error){
				console.log(error);
			});
		},

		renderCanvas: function(){
			this.boardCanvas.render();
			this.boardCanvas.show();
		},

		render: function(){
			$('body').append(this.$el);
			this.boardToolbar.render();
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