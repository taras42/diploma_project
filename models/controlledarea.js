"use strict";
module.exports = function(sequelize, DataTypes) {
  var ControlledArea = sequelize.define("ControlledArea", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Sensor, {as: "sensors"})
      }
    }
  });
  return ControlledArea;
};