module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
      { pattern: 'testbuild/bundle.test.mjs', type: 'module' }
    ],
    exclude: [
    ],
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: 'unified'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'/*, 'Firefox'*/],
    singleRun: true,
    concurrency: 2
  })
}
