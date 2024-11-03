const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: true, 
    port: 3000,
  },
  plugins: [
    new Dotenv(), 
  ],
};
