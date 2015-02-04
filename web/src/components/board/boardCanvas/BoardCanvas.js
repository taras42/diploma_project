define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		BoardCanvasUploadView = require("components/board/boardCanvas/view/BoardCanvasUploadView"),
		BoardCanvasCAView = require("components/board/boardCanvas/view/BoardCanvasCAView"),
		boardCanvasTemplate = require("text!components/board/boardCanvas/template/boardCanvasTemplate.htm");

	require("css!components/board/boardCanvas/css/boardCanvasCss.css");

	var BoardCanvas = Backbone.View.extend({

		el: boardCanvasTemplate,

		constructor: function(options){

			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

			Backbone.View.apply(this, arguments);
		},

		initialize: function(){
			this.uploadView = new BoardCanvasUploadView({
				parentElement: this.$el,
				title: "Add CA Plan"
			});

			this.CAView = new BoardCanvasCAView({
				parentElement: this.$el,
			});

			this.initEvents();
		},

		initEvents: function(){
			this.listenTo(this.uploadView, "upload:change", this.previewControlledArea);
		},

		showControlledArea: function(model){
			var imageURL = model.get("image");

			this.uploadView.hide();
			this.CAView.hide();

			imageURL ? this.CAView.show().showImageResource(imageURL) : this.uploadView.show();
		},

		previewControlledArea: function(uploadView){
			this.uploadView.hide();
			this.CAView.render().showImageResource(uploadView.uploadInput[0].files[0]);
		},

		show: function(){
			this.uploadView.render();
			this.CAView.render();
			this.$el.show();
		},

		render: function(){
			this.parentElement.append(this.$el);

			return this;
		}

	});

	return BoardCanvas;

});