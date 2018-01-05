var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            "react", "stage-2", "env"
          ],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  },
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
