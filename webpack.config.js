const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg)$/,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    static: './dist',
    historyApiFallback: true
  },
  plugins: [
    new Dotenv()
  ]
};
