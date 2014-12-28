'use strict';

exports.up = function(knex, Promise) {
	return knex.schema.createTable('sensors', function (table){
		table.increments('id').primary();
		table.string('type');
		table.string('description');
		table.timestamps();		
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('sensors');
};
