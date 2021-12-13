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
            'scripts': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/swift.js'
        },
        output: {
            path: path.resolve(__dirname, 'Swift','Files','Templates','Designs','Swift','Assets','js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader'
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
        name: 'modules',
        mode: mode,
        entry: {
            'swiffy-slider': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/swiffy-slider.js',
            'tiny-slider': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/tiny-slider.js',
			'plyr': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/plyr.js',
			'aos': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/aos.js',
			'flatpickr': './Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/flatpickr.js',
        },
        output: {
            path: path.resolve(__dirname, 'Swift','Files','Templates','Designs','Swift','Assets','js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader'
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
			'styles': './Swift/Files/Templates/Designs/Swift/Assets/_src/scss/swift.scss'
        },
        output: {
            path: path.resolve(__dirname, 'Swift','Files','Templates','Designs','Swift','Assets','css'),
            filename: '[name].js'
        },
        plugins: [
            new StylelintPlugin({
                configFile: '.stylelintrc.json',
                files: 'Swift/Files/Templates/Designs/Swift/Assets/_src/scss/**/*.scss',
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
