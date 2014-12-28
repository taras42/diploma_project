var bookshelf = require('app').get("bookshelf");

var Sensor = bookshelf.Model.extend({
	tableName: "sensors"
}, {
	create: function(options){
		return this.forge(options);
	}
});