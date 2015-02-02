define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		BoardCanvasUploadView = require("components/board/boardCanvas/view/BoardCanvasUploadView"),
		boardCanvasTemplate = require("text!components/board/boardCanvas/template/boardCanvasTemplate.htm");

	require("css!components/board/boardCanvas/css/boardCanvasCss.css");

	var BoardCanvas = Backbone.View.extend({

		el: boardCanvasTemplate,

		constructor: function(options){

			this.perentElement = options.parentElement ?  $(options.parentElement) : $('body');

			Backbone.View.apply(this, arguments);
		},

		initialize: function(){
			this.uploadView = new BoardCanvasUploadView({
				parentElement: this.$el,
				title: "Add CA Plan"
			});

			this.initEvents();
		},

		initEvents: function(){
			this.listenTo(this.uploadView, "upload:change", this.previewControlledArea);
		},

		showControlledArea: function(model){
			this.uploadView.hide();
			model.get("image") ? true : this.uploadView.show();
		},

		previewControlledArea: function(uploadView){
			
			this.uploadView.hide();
		},

		show: function(){
			this.uploadView.render();
			this.$el.show();
		},

		render: function(){
			this.perentElement.append(this.$el);

			return this;
		}

	});

	return BoardCanvas;

});