module.exports = {

  development: {
    debug: true,
    client: 'pg',
    connection: 'postgres://localhost:5432/spa_development',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
    useNullAsDefault: true
  },

};
