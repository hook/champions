import gulp from 'gulp';
import gutil from 'gulp-util';
import opn from 'opn';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig, { extractStylesPlugin, championIcons } from '../config/webpack-config.js';

gulp.task('develop', (callback) => {
    const domain = inDocker() ? '0.0.0.0' : 'localhost';
    const port = 8080;
    const config = {
        ...webpackConfig,
        entry: ((entry) => {
            const hotEntry = {};
            for(const key in entry) {
                hotEntry[ key ] = [
                    `webpack-dev-server/client?http://${ domain }:${ port }`,
                    'webpack/hot/only-dev-server',
                    ...entry[ key ],
                ];
            }
            return hotEntry;
        })(webpackConfig.entry),
        module: {
            ...webpackConfig.module,
            loaders: webpackConfig.module.loaders.map((loader) => (!loader.hot)? loader: {
                ...loader,
                loaders: [
                    'simple-hot',
                    ...loader.loaders,
                ],
            }),
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            ...webpackConfig.plugins || [],
        ],
        devtool: '#cheap-module-eval-source-map',
    };
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, {
        contentBase: './src',
        hot: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true,
        stats: {
            colors: true,
            assets: false,
            cached: false,
            cachedAssets: false,
            chunks: false,
        },
    });
    server.listen(port, domain, (err) => {
        if (err) {
            callback();
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server] 🌎', `http://${ domain }:${ port }/index.html`);
        if (!inDocker()) {
           opn(`http://${domain}:${port}`);          
        }
    });
});

gulp.task('webpack', (callback) => {
    const config = {
        ...webpackConfig,
        module: {
            ...webpackConfig.module,
            loaders: webpackConfig.module.loaders.map((loader) => (!loader.deploy)? loader: {
                ...loader,
                ...loader.deploy,
            }),
        },
        plugins: [
            extractStylesPlugin,
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                /* eslint-disable camelcase */
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                },
                mangle: true,
                output: {
                    comments: false,
                },
                /* eslint-enable camelcase */
            }),
            new webpack.DefinePlugin({
                'process.env':{
                    'CHAMPION_ICONS': JSON.stringify(championIcons),
                    'NODE_ENV': JSON.stringify('production'),
                },
            }),
            ...webpackConfig.plugins || [],
        ],
        devtool: '#source-map',
    };
    webpack(config, (err) => {
        if(err)
            throw new gutil.PluginError('webpack', err);
        callback();
    });
});

function inDocker() {
  var inDocker = gutil.env.docker;
  if (!inDocker) {
    inDocker = "false";
  }
  return inDocker === "true";
}
