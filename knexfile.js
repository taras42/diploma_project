// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'diploma_project',
      charset  : 'utf8'
    },
     migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'diploma_project',
      charset  : 'utf8'
    },
     migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'diploma_project',
      charset  : 'utf8'
    },
     migrations: {
      tableName: 'knex_migrations'
    }
  }

};
