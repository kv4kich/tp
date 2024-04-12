const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js', // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
assetModuleFilename: pathData => {
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name][ext]`;
    },

  },

  module: {

    rules: [
      {
        test: /\.(sass|css|scss)$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader', 'sass-loader'], // Загрузчики, используемые для обработки CSS-файлов
        
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/inline',
    },
    {
        test: /\.(ttf|eot|woff2?)$/i,
        type: 'asset/resource',
    },

    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'img' }, // Копируем изображения из src/img в dist/img
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};