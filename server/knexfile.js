const nconf = require('./nconf');

module.exports = {

  development: {
    debug: true,
    client: 'pg',
    connection: nconf.get('db:connection'),
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
    useNullAsDefault: true
  },

};
