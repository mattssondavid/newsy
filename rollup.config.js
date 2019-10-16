import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default [

    /* JS Module */
    {
        input: 'build/src/index.js',
        output: {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: true
        },
        plugins: [
            resolve({
                browser: true,
                jsnext: true,
                main: true
            }),
            commonjs(),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                esmodules: true
                            }
                        }
                    ]
                ]
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    },

    /* Legacy support */
    {
        input: 'build/src/index.js',
        output: {
            file: 'dist/legacy.js',
            format: 'iife',
            sourcemap: true
        },
        plugins: [
            resolve({
                browser: true,
                jsnext: true,
                main: true
            }),
            commonjs(),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                plugins: [
                    '@babel/proposal-object-rest-spread'
                ],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            exclude: [
                                'transform-async-to-generator',
                                'transform-regenerator'
                            ],
                            targets: {
                                browsers: [
                                    "last 2 versions"
                                ]
                            }
                        }
                    ]
                ]
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    }
];
