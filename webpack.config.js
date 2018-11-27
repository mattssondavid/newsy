const path = require('path');
const fs = require('fs-extra');

/* Prepare */
// Load Redux
fs.copySync(
    path.resolve(__dirname, 'node_modules/redux/es/redux.mjs'),
    path.resolve(__dirname, 'src/node_modules/redux/es/redux.mjs')
    // Put in `src` so builder can find the file when following import path from index.mjs
);

// Load Web Components polyfill JS
fs.copySync(
    path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    path.resolve(__dirname, 'dist/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js')
);
fs.copySync(
    path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/bundles/'),
    path.resolve(__dirname, 'dist/node_modules/@webcomponents/webcomponentsjs/bundles/')
);

module.exports = {
    entry: path.resolve(__dirname, 'src/index.mjs'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /(\.js|\.mjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    output: {
        filename: 'legacy.js',
        path: path.resolve(__dirname, 'dist')
    }
};
