'use strict';

/*
 * Prepare a new build by copying required files for building
 *
 * Requires to be run through Node
 */

/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs-extra');

// Load Web Components polyfill JS
fs.copy(
    path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    path.resolve(__dirname, 'dist/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js')
);
fs.copy(
    path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/bundles/'),
    path.resolve(__dirname, 'dist/node_modules/@webcomponents/webcomponentsjs/bundles/')
);

// Copy Src (minus JavaScript)
fs.copy(
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'dist'),
    {
        filter: src => {
            if ((/[\/|\\]js[\/|\\]?/u).test(src)) {
                // Skip 'js' directory
                return false;
            }
            if ((/.+[A-Za-z-_]+\..+/u).test(src)) {
                // Skip any .mjs or .js file
                return !(/(?:\.mjs)|(?:\.js)|(?:\.ts)$/u).test(src);
            }

            return true;
        }
    }
);
