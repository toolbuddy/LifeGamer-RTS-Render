const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js'],
		room: './src/room/chatRoom.js',
		status: './src/status/status.js',
        menu: './src/menu/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html'
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        usedExports: true
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'group-css-media-queries-loader']
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            publicPath: 'images/',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(.woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            publicPath: 'data/',
                            outputPath: 'data/'
                        }
                    }
                ]
            }
        ]
    }
}

