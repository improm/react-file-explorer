const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'index_bundle.js',
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {test: /\.(png|jpg|jpeg|gif|svg)$/,loader: 'url', query: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]'
                }
            },
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
