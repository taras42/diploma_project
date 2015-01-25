define(function(require){

	var Backbone = require('backbone'),
        dialogTemplate = require('text!components/common/dialog/template/dialogTemplate.htm'),
        buttonTemplate = require('text!components/common/dialog/template/buttonTemplate.htm'),
        ItemCollection = require('components/common/itemCollection/ItemCollection'),
        Dimmer = require('components/common/dimmer/Dimmer'),
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
                additionalCssClass: this.additionalCssClass,
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
            this.modal = !_.isUndefined(options.modal) ? options.modal : false;

            if(this.modal) {
                this.dimmer = new Dimmer();
            }
            
            this.buttons = new ItemCollection({
                items: options.buttons || defaultButton,
                itemTemplate: buttonTemplate,
                eventPrefix: eventPrefix
            });

            this.additionalCssClass = options.additionalCssClass || ""
            this.content = options.content;

            _.each(options.buttons, function(buttonObj){
                self.listenTo(self.buttons, eventPrefix +":"+ buttonObj.action, function(){
                    self.trigger(eventPrefix +":"+ buttonObj.action, self, self.model);
                });
            });
            
            Backbone.View.apply(this, arguments);
        },

        initialize: function(){
            this.setZIndex();

            this.content = this.content instanceof Backbone.View ? view.render().$el : _.template(this.content)({model: this.model});
            this.$el.find(".content").append(this.content);
            this.$el.find(".footer").append(this.buttons.render().$el);
        },

        setModel: function(model){
            this.model = model;
        },

        setZIndex: function(){
            if(this.dimmer){
                this.$el.css({
                    "zIndex": Dimmer.currentZIndex
                });
            }else{
                this.$el.css({
                    "zIndex": Dialog.currentZIndex += 1
                });
            }
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
            this.dimmer && this.dimmer.show();
            this.$el.show();
            return this;
        },

        hide: function(){
            this.dimmer && this.dimmer.hide();
            this.$el.hide();
            return this;
        },

		render: function(){
            this.dimmer && this.dimmer.render();
            $('body').append(this.$el);
            return this;
		},

        remove: function(){
            this.dimmer && this.dimmer.remove();
            Backbone.View.prototype.remove.apply(this, arguments);
        }

	},{
        currentZIndex: 9000
    });


	return Dialog;

});