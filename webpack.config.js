const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const filename = (ext, isDev = false) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`)
const jsLoaders = (loader) => {
    const loaders = ['babel-loader']

    if (loader) {
        loaders.push(loader)
    }

    return loaders
}

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',

    output: {
        filename: filename('js'),
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
            filename: filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: './favicon.ico', to: path.resolve(__dirname, 'dist')}
            ]
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
                use: jsLoaders()
            }
        ]
    }
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map'
        config.target = 'web'
        config.devServer = {
            open: true,
            port: 3000,
        }
        config.output.filename = filename('js', true)
        config.plugins
            .filter((plugin) => plugin instanceof MiniCSSExtractPlugin)[0].options.filename = filename('css', true)
        config.module.rules[1].use = jsLoaders('eslint-loader')
    }

    return config
}
