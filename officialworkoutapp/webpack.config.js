var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'stage-2', 'env'],
              plugins: ['transform-object-rest-spread']
            }
          }
        ]
      },
      {
        test: /\.?(sass|scss)$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules/foundation-sites/scss')]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};

module.exports = config;
