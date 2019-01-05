module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'testbuild/bundle.test.js'
    ],
    exclude: [
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'Firefox'],
    singleRun: true,
    concurrency: 2
  })
}
