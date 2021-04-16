const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const StylelintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = [
    {
        name: 'scripts',
        mode: mode,
        entry: {
            'scripts': './R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js'
        },
        output: {
            path: path.resolve(__dirname, 'R4','Files','Templates','Designs','R4','Assets','js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new UglifyJsPlugin()
            ]
        }
    },
    {
        name: 'styles',
        mode: mode,
        entry: {
            'styles': './R4/Files/Templates/Designs/R4/Assets/_src/scss/r4.scss'
        },
        output: {
            path: path.resolve(__dirname, 'R4','Files','Templates','Designs','R4','Assets','css'),
            filename: '[name].js'
        },
        plugins: [
            new StylelintPlugin({
                configFile: '.stylelintrc.json',
                files: 'R4/Files/Templates/Designs/R4/Assets/_src/scss/**/*.scss',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new IgnoreEmitPlugin(/\.js$/)
        ],
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }]
                }
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/
                }),
            ]
        }
    }
]
