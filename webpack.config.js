// @ts-check
const { EsbuildPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/**
 * @type {(dev: boolean, name: string) => import('webpack').Configuration}
 */
const config = (dev, name) => ({
    mode: dev ? 'development' : 'production',
    entry: {
        vendors: ['react', 'react-dom/client', 'react-router-dom'],
        main: {
            import: './src/index.tsx',
            dependOn: 'vendors',
        },
        css: './src/default.css',
    },
    output: {
        filename: `static/${name}.js`,
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    target: ['web'],
    optimization: {
        minimize: !dev,
        minimizer: [
            new EsbuildPlugin({
                target: 'es2020',
                css: true,
            }),
        ],
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: 'esbuild-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|webp|ogg)/,
                loader: 'file-loader',
                options: {
                    name: `assets/${name}.[ext]`,
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: '.',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: `static/${name}.css`,
        }),
    ],
    //@ts-ignore
    devServer: {
        host: '0.0.0.0',
        port: process.env.WEBPACK_DEV_SERVER_PORT || 8080,
        static: './public',
        hot: true,
        historyApiFallback: true,
    },
    devtool: dev ? 'source-map' : false,
    performance: {
        maxAssetSize: 512000,
    },
})

module.exports = function (env, argv) {
    console.log(argv)
    const dev = argv.mode === 'development'
    const name = dev ? '[name]' : '[contenthash]'

    return config(dev, name)
}
