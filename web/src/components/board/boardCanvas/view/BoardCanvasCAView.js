define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		boardSettings = require('components/board/boardSettings/boardSettings'),
		boardCanvasCAViewTemplate = require("text!components/board/boardCanvas/template/boardCanvasCATemplate.htm");

	var defautls = {
		OFFSET_TOP: 50,
		OFFSET_LEFT: 50,
		IMAGE_MAX_WIDTH_TOLERANCE: 10,
		IMAGE_MAX_HEIGHT_TOLERANCE: 10
	};

	var BoardCanvasCAView = Backbone.View.extend({
		el: boardCanvasCAViewTemplate,

		initialize: function(options){
			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');
			this.fileReader = new FileReader();
			this.imageBase64 = "";
			this.$imageResource = this.$el.find('.imageResource');

			this.initEvents();
		},

		initEvents: function(){
			var self = this;
			this.fileReader.addEventListener("load", _.bind(self.saveImageBase64, self)); 
			this.$imageResource.on("load", _.bind(self._onImageLoaded, self)); 
		},

		setImageResource: function(resource){
			var src;

			if(_.isString(resource)){
				src = resource;
			}else{
				this.fileReader.readAsDataURL(resource);
				src = this.createObjectURL(resource);
			}
			
			this.$imageResource.attr("src", src);

			if (this.$imageResource[0].complete) {
				this.show();
      			this.$imageResource.load();
    		}

			return this;
		},

		saveImageBase64: function(FREvent){
			this.imageBase64 = FREvent.target.result;
		},

		_onImageLoaded: function(){
			this.trigger("image:loaded", this);
		},

		show: function(){
			this.$el.show();
		},

		hide: function(){
			this.$el.hide();
		},

		render: function(){
			this.parentElement.append(this.$el);
			this.setPosition();
			return this;
		},

		setPosition: function(){
			var height = this.parentElement.height() - defautls.OFFSET_TOP*2;
			var width = this.parentElement.width() - defautls.OFFSET_LEFT*2;

			this.$el.css({
				height: height,
				width: width - boardSettings.SIDE_BAR_WIDTH,
				top: defautls.OFFSET_TOP,
				left: defautls.OFFSET_LEFT
			});

			this.$imageResource.css({
				"maxWidth": width - defautls.IMAGE_MAX_WIDTH_TOLERANCE,
				"maxHeight": height - defautls.IMAGE_MAX_HEIGHT_TOLERANCE			
			});
		},

		createObjectURL: function(object) {
    		return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
		},

		revokeObjectURL: function(url) {
		    return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url);
		},

		remove: function(){
			this.fileReader.removeEventListener("load", this.setImageResourceSrc); 
			this.$imageResource.off("load", this._onImageLoaded);
			this.fileReader = null;
			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});

	return BoardCanvasCAView;
});