const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const webpackConfig = require('../tools/webpack.config.js');
const manifest = require('../client/dist/manifest.json');
const conf = require('./nconf');

const PORT = conf.get('port');

const app = express();
const compiler = webpack(webpackConfig);

app.use(middleware(compiler, {
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('*', function(req, res) {
    res.render('index.html', { manifest });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
