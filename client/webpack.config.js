const path = require("path");

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
];

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  module: { rules },
  devServer: {
    contentBase: "./",
    port: 4000,
  },
};
