"use strict";
module.exports = function(sequelize, DataTypes) {
  var Sensor = sequelize.define("Sensor", {
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sensor;
};