const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'legacy.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements/custom-elements.min.js'),
            to: path.resolve(__dirname, 'dist')
        }]),
        // new CopyWebpackPlugin([{ // Copy "src" to "dist", so browsers that understand the raw data doesn't need legacy.js
        //     from: 'src/**/*',
        //     to: 'dist'
        // }])
    ]
}
