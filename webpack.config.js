const path = require("path");
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const modeIsProd = argv.mode === "production";

  return {
    entry: ["babel-polyfill", "./src/js/app.js"],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "js/bundle.js"
    },
    devtool: modeIsProd ? false : "cheap-eval-source-map",
    devServer: {
      port: "1111",
      contentBase: "./dist"
    },
    plugins: [
      new CleanPlugin(),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(modeIsProd ? "production" : "development"),
        APP_URL: JSON.stringify(modeIsProd ? "https://cute-sort.surge.sh/" : "http://localhost:1111"),
        BUILD_TIME_STAMP: modeIsProd ? Date.now() : false
      }),
      new HTMLPlugin({
        filename: "index.html",
        template: "./src/index.html"
      }),
      new MiniCSSExtractPlugin({
        filename: "app.css"
        // chunkFilename: "[id].css"
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
          use: [
            {
              loader: MiniCSSExtractPlugin.loader,
              options: {
                hmr: modeIsProd ? false : true
              }
            },
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    }
  };
};
