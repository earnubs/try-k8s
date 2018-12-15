const json5 = require('json5');
const nconf = require('nconf');

nconf.argv()
  .env({
    separator: '_',
    lowerCase: true,
    parseValues: true
  })
  .use('file', { format: json5, file: './config/development.json5' });

nconf.required([
  'oauth:github:secret',
  'oauth:github:id',
]);

module.exports = nconf;
