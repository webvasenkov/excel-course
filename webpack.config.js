const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const filename = (ext, mode) => (mode === 'development' ? `[name].${ext}` : `[name].[contenthash].${ext}`)

const jsLoaders = (mode, loader = '') => {
    const loaders = mode === 'development'
        ? ['babel-loader', 'eslint-loader']
        : ['babel-loader']

    if (loader) {
        loaders.push(loader)
    }

    return loaders
}

const setMode = (argv) => argv['mode']

const config = (mode) => ({
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',

    output: {
        filename: filename('js', mode),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: filename('css', mode)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './favicon.ico', to: path.resolve(__dirname, 'dist')}
            ]
        }),
        new webpack.DefinePlugin({
            MODE_ON: JSON.stringify(mode)
        })
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(mode)
            }
        ]
    }
})

module.exports = (env, argv) => {
    const mode = setMode(argv)
    const conf = config(mode)

    if (mode === 'development') {
        conf.devtool = 'source-map'
        conf.target = 'web'
        conf.devServer = {
            open: true,
            port: 3000,
        }
    }

    return conf
}
