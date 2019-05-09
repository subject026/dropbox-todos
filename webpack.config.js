const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = envIsProd => {
  let appUrl;
  if (envIsProd) {
    appUrl = new webpack.DefinePlugin({
      APP_URL: JSON.stringify("https://cranky-goldberg-d11d75.netlify.com/")
    });
  } else {
    appUrl = new webpack.DefinePlugin({
      APP_URL: JSON.stringify("localhost:1111")
    });
  }
  return {
    entry: ["babel-polyfill", "./src/js/app.js"],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "js/bundle.js"
    },
    devtool: "cheap-eval-source-map",
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
    // resolve: {
    //   alias: {
    //     config: path.join(__dirname, "config", process.env.NODE_ENV)
    //   }
    // }
  };
};
