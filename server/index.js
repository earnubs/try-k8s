#!/usr/bin/env node
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const webpackConfig = require('../tools/webpack.config.js');
const manifest = require('../client/dist/manifest.json');
const conf = require('./nconf');

const authRouter = require('./auth');

const PORT = conf.get('port');

const app = express();
nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// dev only
const compiler = webpack(webpackConfig);
app.use(middleware(compiler, {
}));
// css, images, etc will be served from public/ at url /static
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', authRouter);

app.get('*', function(req, res) {
  res.render('index.html', {
    manifest,
    user: req.user
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
