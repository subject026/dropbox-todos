const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = envIsProd => {
  let appUrl, devtool;
  if (envIsProd) {
    appUrl = new webpack.DefinePlugin({
      APP_URL: JSON.stringify("https://subject026.github.io/dropbox-todo/"),
      BUILD_STAMP: Date.now()
    });
    devtool = false;
  } else {
    appUrl = new webpack.DefinePlugin({
      APP_URL: JSON.stringify("http://localhost:1111"),
      BUILD_STAMP: false
    });
    devtool = "cheap-eval-source-map";
  }
  return {
    entry: ["babel-polyfill", "./src/js/app.js"],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "js/bundle.js"
    },
    devtool,
    devServer: {
      port: "1111",
      contentBase: "./dist"
    },
    plugins: [
      new HTMLWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html"
      }),
      appUrl
      // new BundleAnalyzerPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    }
  };
};
