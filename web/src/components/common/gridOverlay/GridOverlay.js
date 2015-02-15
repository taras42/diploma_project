define(function(require){

    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        gridTemplate = require("text!./template/gridTemplate.htm"),
        cellTemplate = require("text!./template/cellTemplate.htm"),
        CellModel = require("./model/CellModel");
        ItemCollection = require("components/common/itemCollection/ItemCollection");

    var defaults = {
        POSITION_ABSOLUTE: "absolute",
        ZINDEX: 1000
    };

    var GridOverlay = Backbone.View.extend({
        el: gridTemplate,

        constructor: function(options){
            var options = options || {};

            var body = $('body');

            this.$parentElement = options.parentElement ?  $(options.parentElement) : body;
            this.$targetElement = options.targetElement;
            this.resolution = options.resolution ? options.resolution : 50;

            this.cellsCollection = new ItemCollection({
                additionalCssClass: options.gridAdditionCssClass || "",
                itemAdditionalCssClass: options.cellAdditionCssClass || "",
                itemTemplate: cellTemplate,
                model: CellModel,
                items: []
            });

            this.cellsXCount = 0;
            this.cellsYCount = 0;

            Backbone.View.apply(this, arguments);
        },

        initialize: function() {
            this.initEvents();
            this.$targetElement && this.buildGrid();
        },

        initEvents: function() {
            this.listenTo(this.cellsCollection, "item:selected", this.onCellClick);
        },

        buildGrid: function(){
            this.calculateGridSize();
            this.custructGrid();
            this.setStyles();
            this.setPosition();
        },

        setTargetElement: function(targetElement){
            this.$targetElement = $(targetElement);

            return this;
        },

        calculateGridSize: function(){
            var targetElementWidth  = this.gridWidth = this.$targetElement.width();
            var targetElementHeight = this.gridHeight = this.$targetElement.height();

            this.xDiff = targetElementWidth % this.resolution;
            this.yDiff = targetElementHeight % this.resolution;

            this.xDiff && (this.gridWidth = targetElementWidth - this.xDiff + this.resolution);

            this.yDiff && (this.gridHeight = targetElementHeight - this.yDiff + this.resolution);
        },

        custructGrid: function(){
            this.cellsCollection.resetCollection();

            var yCellsCount = this.gridHeight / this.resolution;
            var xCellsCount = this.gridWidth / this.resolution;

            for(var i = 0; i < yCellsCount; i++){
                for(var j = 0; j < xCellsCount; j++){

                    var item = this.cellsCollection.addItem(new CellModel({
                        x: j,
                        y: i,
                        resolution: this.resolution  
                    }));

                    item.$el.css({
                        width: this.resolution,
                        height: this.resolution,
                        float: "left"
                    });

                }
            }
        },

        setStyles: function(){
            this.$el.css({
                position: defaults.POSITION_ABSOLUTE,
                width: this.gridWidth,
                height: this.gridHeight,
                zIndex: defaults.ZINDEX
            });
        },

        setPosition: function(){
            var targetElementOffset = this.$targetElement.offset();
            var targetElementWidth  = this.$targetElement.width();
            var targetElementHeight = this.$targetElement.height();

            var top = targetElementOffset.top - Math.floor(((this.gridHeight - targetElementHeight)/2));
            var left = targetElementOffset.left - Math.floor(((this.gridWidth - targetElementWidth)/2));

            this.$el.css({
                top: top,
                left: left
            });
        },

        onCellClick:function(cellView, model) {
            var coordinates = {};

            coordinates.x = cellView.$el.children(".gridCell").data("x");
            coordinates.y = cellView.$el.children(".gridCell").data("y");
            
            this.trigger("cell:selected", cellView, model, coordinates);
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
        },

        remove: function(){
            this.cellsCollection.remove();

            Backbone.View.prototype.remove.apply(this, arguments);
        }

    });


    return GridOverlay;

});
