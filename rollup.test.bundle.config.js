import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default [
    {
        input: 'build/src/**/*.test.js',
        output: {
            file: 'testbuild/bundle.test.mjs',
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
            multiEntry(),
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
                'process.env.NODE_ENV': JSON.stringify('test')
            })
        ]
    }
];
