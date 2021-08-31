import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { Module } from 'webpack'
// @ts-ignore
import LiveReloadPlugin from 'webpack-livereload-plugin'

const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

console.log(isProduction, mode)

const server = {
  context: __dirname,
  mode,
  target: 'node',
  devtool: isProduction ? undefined : 'inline-source-map',
  externals: {
    express: 'express',
  },
  node: {
    __dirname: false,
  },
  entry: {
    lambda: resolve(__dirname, 'app/server/lambda.ts'),
    server: resolve(__dirname, 'app/server/server.ts'),
  },
  output: {
    clean: true,
    filename: '[name].js',
    libraryTarget: 'umd',
    path: resolve(__dirname, '.build/server'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
}

const ui = {
  context: __dirname,
  mode,
  target: 'web',
  devtool: isProduction ? undefined : 'inline-source-map',
  entry: {
    main: resolve(__dirname, 'app/ui/index.tsx'),
  },
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
    chunkFilename: isProduction ? '[name].chunk.[hash].js' : '[name].chunk.js',
    filename: isProduction ? '[name].bundle.[hash].js' : '[name].bundle.js',
    path: resolve(__dirname, '.build/ui'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: ({ context }: Module): string => {
            const [, packageName] = context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/) || []
            return (packageName || 'unknown').replace('@', '')
          },
          chunks: 'all',
        },
      },
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SPA Seed',
      favicon: resolve(__dirname, 'app', 'assets', 'favicon.ico'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true,
      port: 7001,
    }),
  ],
}

export default [server, ui]
