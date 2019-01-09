const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const config = {};
const hostname = 'localhost';
const port = '3080';

module.exports = function (env, argv) {

    // Prod config
    if (argv.mode === 'production') {
        config.optimization = {
            minimizer: [new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })],
        };
        config.entry = './src/index.js';
        config.output = {
            path: path.resolve(__dirname, 'dist'),
            filename: 'pixel.js'
        };
    }

    // Dev config
    if (argv.mode === 'development') {
        config.watch = true;
        config.watchOptions = {
            ignored: ['node_modules']
        };
        config.entry = {
            'pixel': './src/index.js',
            'test.build': 'mocha-loader!./tests/index.js',
        };
        config.output = {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: 'http://' + hostname + ':' + port + '/tests'
        };
        config.devServer = {
            host: hostname,
            port: port,
            open: true,
            openPage: 'webpack-dev-server/tests/spec.html'
        }
    }

    // Env vars inject
    config.plugins = [
        new webpack.DefinePlugin({
            'UBEX_URL': JSON.stringify(argv.mode !== 'production' ? 'localhost:3000' : 'pixel.ubex.io')
        })
    ];

    return config;
};