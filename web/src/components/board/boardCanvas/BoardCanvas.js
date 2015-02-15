define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		BoardCanvasUploadView = require("components/board/boardCanvas/view/BoardCanvasUploadView"),
		GridOverlay = require("components/common/gridOverlay/GridOverlay"),
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
				parentElement: this.$el
			});

			this.initEvents();
		},

		initEvents: function(){
			this.listenTo(this.uploadView, "upload:change", this.previewControlledArea);
			this.listenTo(this.CAView, "image:loaded", this.initGridOverlay);
		},

		initGridOverlay: function(){
			this.gridOverlay = new GridOverlay({
				targetElement: this.CAView.$imageResource
			});

			this.gridOverlay.render().show();
		},

		showControlledArea: function(model){
			var imageURL = model.get("image");

			this.uploadView.hide();
			this.CAView.hide();

			imageURL ? this.CAView.setImageResource(imageURL).show() : this.uploadView.show();
		},

		previewControlledArea: function(uploadView){
			this.uploadView.hide();
			this.CAView.setImageResource(uploadView.$uploadInput[0].files[0]).show();
			uploadView.resetUploadInput();
		},

		show: function(){
			this.uploadView.render();
			this.CAView.render();
			this.$el.show();
		},

		render: function(){
			this.parentElement.append(this.$el);

			return this;
		},

		remove: function(){
			this.uploadView.remove();
			this.CAView.remove();
			this.gridOverlay.remove();

			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});

	return BoardCanvas;

});