const json5 = require('json5');
const nconf = require('nconf');
const path = require('path');

nconf.argv()
  .env({
    separator: '_',
    lowerCase: true,
    parseValues: true
  })
  .use('file', { format: json5, file: path.resolve(__dirname, './config/development.json5') });

nconf.required([
  'oauth:github:secret',
  'oauth:github:id',
  'session:secret',
]);

console.log(nconf.get('port'));

module.exports = nconf;
