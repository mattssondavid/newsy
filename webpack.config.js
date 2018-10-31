const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.mjs'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'legacy.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs'),
            to: path.resolve(__dirname, 'dist/node_modules/webcomponentsjs/')
        }]),
    ]
}
