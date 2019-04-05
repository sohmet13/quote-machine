const path = require('path');
// const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['jquery-ui'];

module.exports = {
    mode: 'development',
    entry: './src/script.js',
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};