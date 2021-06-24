const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const StylelintPlugin = require('stylelint-webpack-plugin');

if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}
console.warn(isProduction, process.env.NODE_ENV, mode);

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
                    test: /\.js?$/,
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
                new TerserPlugin({
					terserOptions: {
						mangle: true,
						format: {
							comments: false,
						}
					},
				})
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
            new IgnoreEmitPlugin(/\.js$/),
        ],
        module: {
            rules: [
                {
                    test: /.s?css$/,
                    use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						'postcss-loader',
						'sass-loader'
					],
				},
				{
					test: /\.(jpe?g|gif|png|svg)$/,
					loader: 'url-loader',
				}
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
				new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.css$/,
					cssProcessorOptions: {
						map: {
							inline: false,
							annotation: true,
						},
					},
				}),
            ]
        }
    }
]
