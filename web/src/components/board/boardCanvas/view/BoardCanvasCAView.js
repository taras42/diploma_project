define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		boardCanvasCAViewTemplate = require("text!components/board/boardCanvas/template/boardCanvasCATemplate.htm");

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

			return this;
		},

		saveImageBase64: function(FREvent){
			this.imageBase64 = FREvent.target.result;
		},

		show: function(){
			this.$el.show();
		},

		hide: function(){
			this.$el.hide();
		},

		render: function(){
			this.parentElement.append(this.$el);
			return this;
		},

		createObjectURL: function(object) {
    		return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
		},

		revokeObjectURL: function(url) {
		    return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url);
		},

		remove: function(){
			this.fileReader.removeEventListener("load", this.setImageResourceSrc); 
			this.fileReader = null;
			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});

	return BoardCanvasCAView;
});