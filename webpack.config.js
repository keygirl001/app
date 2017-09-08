var webpack = require('webpack');
var providePlugin = new webpack.ProvidePlugin({$: 'jquery',jQuery: 'jquery','window.jQuery':'jquery'});
module.exports = {
    entry: './src/js/entry.js',
    output: {
       path: './static/',
       publicPath: 'http://localhost:8080/static/',
       filename: 'index.js' 
    },
    module: {
        loaders: [
            {test: /.js$/, loader: 'babel-loader', query: { presets: ['es2015'] }, exclude: /node_modules/},
            {test: /.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /.(jpg|png)$/, loader: 'url?limit=8192'}
        ]
    },
    plugins: [providePlugin]
}