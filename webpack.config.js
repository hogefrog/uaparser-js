const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './dist/uaparser.min.js',
        library: 'uap',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};