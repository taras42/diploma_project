define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		boardCanvasCAViewTemplate = require("text!components/board/boardCanvas/template/boardCanvasCATemplate.htm");

	var BoardCanvasCAView = Backbone.View.extend({
		el: boardCanvasCAViewTemplate,

		initialize: function(options){
			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');
			this.fileReader = new FileReader();
			this.initEvents();
		},

		initEvents: function(){
			var self = this;
			this.fileReader.addEventListener("load", _.bind(self.setImageResourceSrc, self)); 
		},

		showImageResource: function(resource){
			this.fileReader.readAsDataURL(resource);
		},

		setImageResourceSrc: function(FREvent){
			this.$el.find('.imageResource').attr("src", FREvent.target.result);
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

		remove: function(){
			this.fileReader.removeEventListener("load", this.setImageResourceSrc); 
			this.fileReader = null;
			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});

	return BoardCanvasCAView;
});