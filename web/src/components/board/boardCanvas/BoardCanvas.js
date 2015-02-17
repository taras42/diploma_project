define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		BoardCanvasUploadView = require("components/board/boardCanvas/view/BoardCanvasUploadView"),
		GridOverlay = require("components/common/gridOverlay/GridOverlay"),
		BoardCanvasCAView = require("components/board/boardCanvas/view/BoardCanvasCAView"),
		Dialog = require("components/common/dialog/Dialog"),
		addSensorTemplate = require("text!components/board/boardCanvas/template/boardCanvasAddSensorDialog.htm"),
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

			this.gridOverlay = new GridOverlay();

			this.addSensorDialog = new Dialog({
				buttons: [{title: "Add", action: "add", additionalCssClass: ""}, 
					{title: "Cancel", action: "cancel", additionalCssClass: ""}],
				model: new Backbone.Model(),
				content: addSensorTemplate,
				modal: true,
				parentContainer: "#mainBoard",
				title: "Add new sensor",
				additionalCssClass: "boardCanvasDialog" 
			});

			this.initEvents();
		},

		initEvents: function(){
			this.listenTo(this.uploadView, "upload:change", this.previewControlledArea);
			this.listenTo(this.CAView, "image:loaded", this.buildGridOverlay);
			this.listenTo(this.gridOverlay, "cell:selected", this.openAddSensorDialog);

			//this.listenTo(this.addSensorDialog, "button:add", this.addSensor);
			this.listenTo(this.addSensorDialog, "button:cancel", this.closeAddSensorDialog);
		},

		buildGridOverlay: function(CAView){
			this.gridOverlay.setTargetElement(CAView.$imageResource).buildGrid();
			this.gridOverlay.render().show();
		},

		showControlledArea: function(model){
			var imageURL = model.get("image");

			this.uploadView.hide();
			this.CAView.hide();
			this.gridOverlay.hide();

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

		_onGridOverlayCellClick: function(cellView, model, coordinates){

		},

		openAddSensorDialog: function(){
			this.addSensorDialog.render().show();
		},

		closeAddSensorDialog: function(){
			this.addSensorDialog.hide();
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