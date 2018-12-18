module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['chai', 'tap'],
    files: [
      { pattern: 'src/**/tests.mjs', type: 'module' }
    ],
    exclude: [
    ],
		preprocessors: {
      'src/**/*.mjs': ['rollup']
		},
		rollupPreprocessor: {
      output: {
        format: 'esm',
        // name: 'karma-test',
        // sourcemap: 'inline'
      },
      plugins: [
        require('rollup-plugin-node-resolve')({
          browser: true,
          jsnext: true,
          main: true
        }),
        require('rollup-plugin-commonjs')({
          namedExports: {
            'chai': ['expect'],
            'tap': ['mocha']
          }
        }),
        require('rollup-plugin-babel')({
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
        require('rollup-plugin-replace')({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
		},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'Firefox'],
    singleRun: true,
    concurrency: 2
  })
}
