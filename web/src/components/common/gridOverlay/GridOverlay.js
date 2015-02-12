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

            this.cellsXCount = 0;
            this.cellsYCount = 0;

            Backbone.View.apply(this, arguments);
        },

        initialize: function() {
            this.initEvents();
            this.calculateGridSize();
            this.custructGrid();
            this.setGridSize();
        },

        initEvents: function() {
            this.listenTo(this.cellsCollection, "item:selected", this.onCellClick);
        },

        calculateGridSize: function(){
            var targetElementWidth  = this.gridWidth = this.$targetElement.width();
            var targetElementHeight = this.gridHeight = this.$targetElement.height();

            var xDiff = targetElementWidth % this.resolution;
            var yDiff = targetElementHeight % this.resolution;

            xDiff && (this.gridWidth = targetElementWidth - xDiff + this.resolution);

            yDiff && (this.gridHeight = targetElementHeight - yDiff + this.resolution);
        },

        custructGrid: function(){
            var yCellsCount = this.gridHeight / this.resolution;
            var xCellsCount = this.gridWidth / this.resolution;

            for(var i = 0; i < yCellsCount; i++){
                for(var j = 0; j < xCellsCount; j++){

                    var item = this.cellsCollection.thisItem(new CellModel({
                        x: j,
                        y: i,
                        resolution: this.resolution  
                    }));

                    item.css({
                        width: this.resolution,
                        height: this.resolution,
                        float: "left"
                    });

                }
            }
        },

        setGridSize: function(){
            this.$el.width(this.gridWidth);
            this.$el.height(this.gridHeight);
        },

        onCellClick:function(cellView, model) {
            this.trigger("cell:selected", cellView, model);
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
