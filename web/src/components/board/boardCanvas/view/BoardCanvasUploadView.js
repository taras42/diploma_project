define(function (require) {
	
	var Backbone = require("backbone"),
		_ = require("underscore"),
		$ = require("jquery"),
		boardCanvasUploadTemplate = require("text!components/board/boardCanvas/template/boardCanvasUploadTemplate.htm");

	var BoardCanvasUploadView = Backbone.View.extend({
		
		events: {
			"change input.upload": "_onUploadInputChange"
		},

		el: function(){
			return _.template(boardCanvasUploadTemplate)({
				title: this.title
			});
		},

		constructor: function(options){
			this.title = options && options.title ? options.title : "Upload"

			Backbone.View.apply(this, arguments);
 		},

		initialize: function(options){

			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

			this.$uploadInput = this.$el.find("input.upload");

			this.initEvents();
		},

		initEvents: function(){
			var self = this;

			$(window).on("resize", function(){
				self.setPosition();
			});
		},

		setPosition: function(){
			var parentElementWidth = this.parentElement.width();
			var parentElementHeight = this.parentElement.height();

			this.$el.css({
				'top': (parentElementHeight/2 - this.$el.outerHeight()/2) + 'px',
				'left': (parentElementWidth/2 - this.$el.outerWidth()/2) + 'px'
			});
		},

		resetUploadInput: function(){
			this.$uploadInput.val("");
		},

		_onUploadInputChange: function(){
			this.trigger("upload:change", this);
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

		remove: function(){
			$(window).off("resize");

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});

	return BoardCanvasUploadView;

});