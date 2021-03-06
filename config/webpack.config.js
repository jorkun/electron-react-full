const path = require('path')
const webpack = require('webpack')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

const { NODE_ENV } = process.env

const projectPath = process.cwd()
const appPath = path.join(__dirname, `../src`)

const styleLoader = [{ loader: 'css-loader' }]
if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

console.log(NODE_ENV, appPath)
const pubPath = path.join(__dirname, `../`);
const webpackConfig = {
  mode: NODE_ENV,
  target: 'electron-renderer',
  entry: {
    app: `${appPath}/index.js`,
  },
  resolve: {
    modules: [projectPath, 'node_modules'],
    extensions: [".jsx", ".js"],
    alias: {
      Components: path.resolve(pubPath, "./src/components"),
      Assets: path.resolve(pubPath, "./src/assets/"),
      Pages: path.resolve(pubPath, "./src/pages/"),
      Pub: path.resolve(pubPath, "./src/pub/"),
      Store: path.resolve(pubPath, "./src/store/"),
      Basic: path.resolve(pubPath, "./src/basic/")
    }
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, `../dist`),
    filename: 'js/[name].js',
    chunkFilename: "js/[name].js",
  },

  devtool: 'source-map',
  externals: {
    'shortcut-capture': 'require("shortcut-capture")'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: appPath,
        use: [{
          loader: require.resolve('eslint-loader'),
          options: {
            formatter: require('eslint-friendly-formatter'),
            eslintPath: require.resolve('eslint')
          }
        }]
      },
      {
        test: /\.js[x]?$/,
        include: appPath,
        loader: ['babel-loader']
      },
      {
        test: /\.(less)$/,
        use: [
          ...styleLoader,
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                // 更改主题色
                'primary-color': '#FF7700',
                'border-radius-base': '2px',
                'text-color': '#0C0101',
                'border-color-base': '#dedede'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: styleLoader
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          // limit: 10000,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      name: 'common'
    }
  },

  plugins: [
    new ProgressBarPlugin(),
    new htmlWebpackPlugin({
      template: `${appPath}/index.html`,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: "css/[name].css"
    }),
    new webpack.ProvidePlugin({
      $api: 'src/api',
      $app: 'src/utils/app.js',
      $config: 'config/app.config.js',
    }),
  ]
}

if (NODE_ENV === 'development') {
  // 开发环境配置
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
} else if (NODE_ENV === 'production') {
  // 生产环境配置
  webpackConfig.devtool = false
  webpackConfig.plugins.push(
    new OptimizeCSSAssetsPlugin()
  )
}

module.exports = webpackConfig