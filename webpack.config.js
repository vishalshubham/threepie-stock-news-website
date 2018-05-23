var path = require("path");
var config = {
  entry: ["./src/client/scripts/index.tsx"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      {

        exclude: /node_modules/,
        loader: "ts-loader",
        test: /\.tsx?$/
      },
      {
        exclude: /node_modules/,
        loader: "file-loader",
        test: /\.(gif|svg|jpg|png)$/
      },
      {
        exclude: /node_modules/,
        loader: "css-loader",
        test: /\.(css|scss)$/
      }
    ]
  }
};

module.exports = config;