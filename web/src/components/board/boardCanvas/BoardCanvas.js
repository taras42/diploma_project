define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		BoardCanvasUploadView = require("components/board/boardCanvas/view/BoardCanvasUploadView"),
		GridOverlay = require("components/common/gridOverlay/GridOverlay"),
		SensorModel = require("components/board/model/SensorModel"),
		BoardCanvasCAView = require("components/board/boardCanvas/view/BoardCanvasCAView"),
		Dialog = require("components/common/dialog/Dialog"),
		addSensorTemplate = require("text!components/board/boardCanvas/template/boardCanvasAddSensorDialogTemplate.htm"),
		ItemCollection = require("components/common/itemCollection/ItemCollection"),
		sensorTemplate = require("text!components/board/boardCanvas/template/sensorTemplate.htm")
		boardCanvasTemplate = require("text!components/board/boardCanvas/template/boardCanvasTemplate.htm");

	require("css!components/board/boardCanvas/css/boardCanvas.css");

	var BoardCanvas = Backbone.View.extend({

		el: boardCanvasTemplate,

		constructor: function(options){

			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

			Backbone.View.apply(this, arguments);
		},

		initialize: function(){
			this.uploadView = new BoardCanvasUploadView({
				parentElement: this.$el,
				title: "+"
			});

			this.CAView = new BoardCanvasCAView({
				parentElement: this.$el
			});

			this.sensorsCollection = new ItemCollection({
				itemTemplate: sensorTemplate,
				itemAdditionalCssClass: "sensor",
				model: SensorModel
			});

			this.gridOverlay = new GridOverlay({
				gridAdditionalCssClass: "noselect"
			});

			this.tempPropertiesModel = new Backbone.Model();

			this.addSensorDialog = new Dialog({
				buttons: [{title: "Add", action: "add", additionalCssClass: ""}, 
					{title: "Cancel", action: "cancel", additionalCssClass: ""}],
				model: new SensorModel(),
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
			this.listenTo(this.gridOverlay, "cell:dblclick", this.openAddSensorDialog);

			this.listenTo(this.addSensorDialog, "button:add", this.addSensor);
			this.listenTo(this.addSensorDialog, "button:cancel", this.closeAddSensorDialog);
		},

		buildGridOverlay: function(CAView){
			this.gridOverlay.setTargetElement(CAView.$imageResource).buildGrid();
			this.gridOverlay.render().show();

			this.trigger("canvas:ready", this, this.CAView);
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

		addSensor: function(dialog, model){
			var cellView  = this.tempPropertiesModel.get("sensorCell");

			var sensorView = this.sensorsCollection.addItem(model, {merge: true});

			cellView.$el.append(sensorView.render().$el);

			this.trigger("sensor:added", sensorView);

			this.addSensorDialog.hide();
		},

		findSensorByCoordinates: function(coordinates){
			return this.sensorsCollection.findBy(coordinates);
		},

		findSensorBySensorId: function(sensor_id){
			return this.sensorsCollection.findBy({sensor_id: sensor_id});
		},

		openAddSensorDialog: function(cellView, model, coordinates){
			var sensorView = this.findSensorByCoordinates(coordinates);

			sensorView ? this.addSensorDialog.refresh(sensorView.model) : this.addSensorDialog.refresh(new SensorModel(coordinates));

			this.tempPropertiesModel.set("sensorCell", cellView);

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
			this.tempPropertiesModel.clear();

			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});

	return BoardCanvas;

});