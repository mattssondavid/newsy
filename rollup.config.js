import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.mjs',
    output: {
        file: 'dist/legacy.js',
        format: 'iife',
        sourceMap: true
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
};
