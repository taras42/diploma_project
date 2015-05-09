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
            "keyup input[type='text'], input[type='checkbox'], input[type='radio']": "onChange",
            "change input[type='text'], input[type='checkbox'], input[type='radio']": "onChange"
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
            this.eventPrefix = "button";
            this.modal = !_.isUndefined(options.modal) ? options.modal : false;
            this.parentContainer = options.parentContainer || 'body'

            if(this.modal) {
                this.dimmer = new Dimmer();
            }
            
            this.buttons = new ItemCollection({
                items: options.buttons || defaultButton,
                itemTemplate: buttonTemplate
            });

            this.isRendered = false;

            this.additionalCssClass = options.additionalCssClass || ""
            this.contentTemplate = options.content;

            this.listenTo(this.buttons, "item:selected", function(itemView, itemModel){
                self.trigger(self.eventPrefix + ":" + itemModel.get("action"), self, self.model);
            });
            
            Backbone.View.apply(this, arguments);
        },

        initialize: function(){
            this.setZIndex();

            this.renderContent();
            this.$el.find(".footer").append(this.buttons.render().$el);
        },

        setModel: function(model){
            this.model = model;

            return this;
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

        setPosition: function(){
            var bodyWidth = $('body').width();
            var bodyHeight = $('body').height();
            var dialogWidth = this.$el.width();
            var dialogHeight = this.$el.height();

            this.$el.css({
                "top": (bodyHeight/2 - dialogHeight/2) + 'px',
                "left": (bodyWidth/2 - dialogWidth/2) + 'px',
            });
        },

        renderContent: function(content){
            var content  = content ? content : this.contentTemplate;

            var html = content instanceof Backbone.View ? content.render().$el : _.template(this.contentTemplate)({model: this.model.toJSON()});

            this.$el.find(".content").empty().append(html);

            return this;
        },

        refresh: function(model){
            this.setModel(model).renderContent();
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
            if(!this.isRendered){
                this.dimmer && this.dimmer.render();
                $(this.parentContainer).append(this.$el);
                this.setPosition();
                this.isRendered = true;
            }

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