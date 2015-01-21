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
            var self = this;

            if(!options || !options.model){
                throw 'Model is required';
            }

            if(!options.content){
                throw 'Content template is required';
            }

            this.model = options.model;
            this.title = options.title || "";
            var eventPrefix = "button";
            
            this.buttons = new ItemCollection({
                items: options.buttons || defaultButton,
                itemTemplate: buttonTemplate,
                eventPrefix: eventPrefix
            });

            this.additionalClass = options.additionalClass || ""
            this.content = options.content;

            _.each(options.buttons, function(buttonObj){
                self.listenTo(self.buttons, eventPrefix +":"+ buttonObj.action, function(){
                    self.trigger(eventPrefix +":"+ buttonObj.action, self, self.model);
                });
            });
            
            Backbone.View.apply(this, arguments);
        },

        initialize: function(){
            this.content = this.content instanceof Backbone.View ? view.render().$el : _.template(this.content)({model: this.model});
            this.$el.find(".content").append(this.content);
            this.$el.find(".footer").append(this.buttons.render().$el);
        },

        setModel: function(model){
            this.model = model;
        },

        refresh: function(){
            var content = this.content instanceof Backbone.View ? view.render().$el : _.template(this.content)({model: this.model});
           
            this.$el.find(".content").empty().append(content);
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