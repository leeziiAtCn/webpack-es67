/**
 * Created: leezii
 * Date: 2018/1/22
 * Time: 14:32
 */
const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const utils = require('./utils')
const config = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'javascript/[name][hash:4].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new webpack.optimize.CommonsChunkPlugin('main'),
    new ExtractTextPlugin('style/[name].css'),
    new UglifyJSPlugin(),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        {
          path: '//cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
          type: 'js'
        },
        {
          path: '//unpkg.com/babel-polyfill@6.26.0/dist/polyfill.min.js',
          type: 'js'
        }
      ],
      append: false,
      publicPath: ''
    })
  ],
  externals: {
    'jquery': 'window.jQuery',
    'babel-polyfill': '_babelPolyfill'
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    noInfo: false,
    compress: true,
    host: utils.gitIp(),
    port: 8080,
    disableHostCheck: true
  }
}
config.entry = {...config.entry, ...utils.getEntries('js')}
const pages = utils.getEntries('html')
for (let page in pages) {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: `./${page}.html`,
    template: pages[page],
    inject: true,
    chunks: ['main', page]
  }))
}
module.exports = config
