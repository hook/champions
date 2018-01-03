import webpackConfig from './webpack-config';

export default function(config) {
    config.set({
        singleRun: true,
        browsers: [ 'PhantomJS' ],
        // karma only needs to know about the test bundle
        files: [
            { pattern: './node_modules/babel-polyfill/dist/polyfill.js', watched: false, included: true, served: true },
            { pattern: './src/images/**/*', watched: false, included: false, served: true },
            './test/**/*.js*',
        ],
        proxies: {
            '/images/': '/base/src/images/',
        },
        frameworks: [ 'chai', 'mocha' ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            './test/**/*.js*': [ 'webpack', 'sourcemap' ],
        },
        // reporter options
        reporters: [ 'mocha' ],
        mochaReporter: {
            colors: {
                success: 'green',
                info: 'grey',
                warning: 'yellow',
                error: 'red',
            },
        },
        // webpack config object
        webpack: {
            ...webpackConfig,
            devtool: 'inline-cheap-module-source-map',
        },
        webpackMiddleware: {
            noInfo: true,
        },
        webpackServer: {
            noInfo: true,
        },
        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],
        colors: true,
        logLevel: config.LOG_WARN,
        concurrency: Infinity,
    });
}
