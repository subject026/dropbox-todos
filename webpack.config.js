const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const envVars = new webpack.DefinePlugin({
    APP_URL: JSON.stringify(
      argv.mode === "production" ? "https://subject026.github.io/dropbox-todos/" : "http://localhost:1111"
    ),
    BUILD_STAMP: argv.mode === "production" ? Date.now() : false
  });
  const devtool = argv.mode === "production" ? false : "cheap-eval-source-map";
  console.log("envVars : ", envVars);
  console.log("devtool? : ", devtool);

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
      envVars,
      new HTMLPlugin({
        filename: "index.html",
        template: "./src/index.html"
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: "./src/src-sw.js",
        swDest: "sw.js"
      }),
      new CopyPlugin([
        {
          from: "./src/manifest.json",
          to: "manifest.json"
        },
        {
          from: "./src/images",
          to: "images"
        }
      ])
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
