var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugins = require("html-webpack-plugin");
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var common = {
  entry : "./app/page/Index/index.jsx",
  output :{
    path : __dirname + "/build/",
    filename : "bundle.js"
  },
  module : {
    loaders : [
      {
        test : /\.css$/,
        loaders : ["style","css"],
        exclude : /mode_modules/
      },
      {
        test: /\.jsx?$/,
        loader : "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugins({
      title : "Kanban app"
    }),
  ]
};

var targetStart = {
  devtool : "source-map",
  devServer : {
    historyApiFallback : true,
    hot : true,
    inline : true,
    progress : true,
    stats : "errors-only",

  },
  plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
}

console.log("TARGET : ",TARGET);
if(TARGET == "start" || !TARGET){
  module.exports = merge(common, targetStart);
}

