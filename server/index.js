const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const webpackConfig = require('../tools/webpack.config.js');
const manifest = require('../client/dist/manifest.json');

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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
