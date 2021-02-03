const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = [
    {
        name: 'r4.js',
        mode: mode,
        devtool: 'inline-source-map',
        entry: {
            'r4': './R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js',
            'r4.min': './R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js'
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
                new UglifyJsPlugin({
                    include: /\.min\.js$/
                })
            ]
        }
    },
    {
        name: 'r4.scss',
        mode: mode,
        devtool: 'inline-source-map',
        entry: {
            'r4': './R4/Files/Templates/Designs/R4/Assets/_src/scss/r4.scss',
            'r4.min': './R4/Files/Templates/Designs/R4/Assets/_src/scss/r4.scss'
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
                        loader: 'sass-loader',
                        options: { sourceMap: !isProduction }
                    }]
                }
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.min\.css$/
                })
            ]
        }
    }
]