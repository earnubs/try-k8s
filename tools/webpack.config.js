const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const webpack = require('webpack');

const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../client'),
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: OUTPUT_DIR
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin([OUTPUT_DIR]),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            rootMode: "upward"
          }
        }
      }
    ]
  }
};
