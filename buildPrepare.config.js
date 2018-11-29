'use strict';

/*
 * Requires to be run through Node
 */

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