define(function(require){

	var Backbone = require("backbone"),
		$ = require("jquery"),
		dimmerTemplate = require("text!components/common/dimmer/template/dimmerTemplate.htm");

	require("css!components/common/dimmer/css/dimmerCss.css");

	var Dimmer = Backbone.View.extend({
		template: dimmerTemplate,

		el: function(){
			return this.template;
		},

		initialize: function(){
			Dimmer.currentZIndex += 1;

			this.$el.css({
				"zIndex": Dimmer.prototype.currentZIndex
			});
		},

		show: function(){
			this.$el.show();
			return this;
		},

		hide: function(){
			this.$el.hide();
			return this;
		},

		render: function(){
			$('body').append(this.$el);
			return this;
		}
	}, {
		currentZIndex: 9000
	});

	return Dimmer;
});