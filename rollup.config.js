import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default [

    /* JS Module */
    {
        input: 'src/index.mjs',
        output: {
            file: 'dist/index.mjs',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            resolve({
                browser: true,
                jsnext: true,
                main: true
            })
        ]
    },

    /* Legacy support */
    {
        input: 'src/index.mjs',
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
                exclude: 'node_modules/**'
            })
        ]
    }
];
