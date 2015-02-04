define(function(require){

    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        gridTemplate = require("text!./template/gridTemplate.htm"),
        ItemCollection = require("components/common/itemCollection/ItemCollection");


    var GridOverlay = Backbone.View.extend({
        el: gridTemplate,

        constructor: function(options){

            this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');

            this.cellsCollection = new ItemCollection({
                additionalCssClass: options.gridAdditionCssClass || "",
                itemAdditionalCssClass: options.cellAdditionCssClass || "",
                itemTemplate: options.cellTemplate,
                model: options.model,
                items: options.data || []
            });

            Backbone.View.apply(this, arguments);
        },

        initialize: function() {
            this.initEvents();
        },

        initEvents: function() {
            this.listenTo(this.cellsCollection, "item:selected", this.onCellClick);
        },

        onCellClick:function(cellView, model) {
            this.trigger("cell:selected", cellView, model);
        },

        renderData: function(data) {
            var self = this;
            _.each(this.cellCollection.models, function(model){
                var item = self.cellsCollection.addItem(model);
                self.cellsCollection.renderItem(item);
            });
        },

        show: function(){
            this.$el.show();
        },

        hide: function(){
            this.$el.hide();
        },

        render: function(){
            this.parentElement.append(this.$el.append(this.cellsCollection.render().$el));
            return this;
        }

    });


    return GridOverlay;

});
