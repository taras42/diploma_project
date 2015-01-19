define(function(require){

	var Backbone = require('backbone'),
        dialogTemplate = require('text!components/common/dialog/template/dialogTemplate.htm'),
        buttonTemplate = require('text!components/common/dialog/template/buttonTemplate.htm'),
        ItemCollection = require('components/common/itemCollection/ItemCollection'),
		_ = require('underscore'),
		$ = require('jquery');

    var defaultButton = [{
        title: 'Ok',
    }];  

	var Dialog = Backbone.View.extend({

        events: {
            "keyup input[type='text'], input[type='checkbox'], input[type='radio']": "onChange"
        },

        template: dialogTemplate,

        el: function(){
            return _.template(this.template)({
                additionalClass: this.additionalClass,
                title: this.title
            });
        },

		constructor: function(options) {

            if(!options || options.model){
                throw 'Model is required';
            }

            if(!options.contentTemplate){
                throw 'Content template is required';
            }

            this.model = options.model;
            this.title = options.title || "";
            
            this.buttons = new ItemCollection({
                items: options.buttons || defaultButton,
                itemTemplate: buttonTemplate,
                eventPrefix: "button"
            });

            this.additionalClass = options.additionalClass || ""
            this.contentTemplate = options.contentTemplate;
            
            Backbone.View.apply(this, arguments);
        },

        initialize: function(){
            this.renderSections();
        },

        renderSections: function(){
            this.$el.find(".content").append(_.template(this.contentTemplate)({model: this.model}));
            this.$el.find(".footer").append(this.buttons.render().$el);
        },

        onChange: function(event){
            var target = $(event.target);
            var attribute = target.attr("name");
            this.model.set(attribute, target.val());
        },

        show: function(){
            this.$el.show();
        },

        hide: function(){
            this.$el.hide();
        },

		render: function(){
            $('body').append(this.$el);
            return this;
		}

	});


	return Dialog;

});