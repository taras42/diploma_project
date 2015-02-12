define(function(require){

    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        gridTemplate = require("text!./template/gridTemplate.htm"),
        cellTemplate = require("text!./template/cellTemplate.htm"),
        CellModel = require("./model/CellModel");
        ItemCollection = require("components/common/itemCollection/ItemCollection");


    var GridOverlay = Backbone.View.extend({
        el: gridTemplate,

        constructor: function(options){

            var body = $('body');

            this.$parentElement = options.parentElement ?  $(options.parentElement) : body;
            this.$targetElement = options.targetElement ? $(options.targetElement) : body;
            this.resolution = options.resolution ? options.resolution : 50;

            this.cellsCollection = new ItemCollection({
                additionalCssClass: options.gridAdditionCssClass || "",
                itemAdditionalCssClass: options.cellAdditionCssClass || "",
                itemTemplate: cellTemplate,
                model: CellModel,
                items: []
            });

            Backbone.View.apply(this, arguments);
        },

        initialize: function() {
            this.initEvents();
        },

        initEvents: function() {
            this.listenTo(this.cellsCollection, "item:selected", this.onCellClick);
        },

        calculateGridSize: function(){
            var targetElementWidth = this.$targetElement.width();
            var targetElementHeight = this.$targetElement.height();

            // TODO
        },

        custructGrid: function(){

        },

        onCellClick:function(cellView, model) {
            this.trigger("cell:selected", cellView, model);
        },

        renderCells: function(data) {
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
            this.$parentElement.append(this.$el.append(this.cellsCollection.render().$el));
            return this;
        }

    });


    return GridOverlay;

});
