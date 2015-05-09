"use strict";
module.exports = function(sequelize, DataTypes) {
  var Sensor = sequelize.define("Sensor", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    sensor_id: DataTypes.STRING,
    description: DataTypes.STRING,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.ControlledArea, {as: "ControlledArea"})
      }
    }
  });
  return Sensor;
};