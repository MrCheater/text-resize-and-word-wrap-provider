var webpack = require('webpack');

module.exports = {
    entry: './src/demo/client.js',
    output: {
        path: './docs',
        filename: 'client.js',
        publicPath: '/client.js',
        devtoolModuleFilenameTemplate: '[resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['','.js'],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            minimize: true,
            mangle: true,
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    ],
    watch : true
};

if(process.env.TARGET === 'preact') {
    module.exports.resolve.alias = {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
    };
} else if(process.env.TARGET === 'react-lite') {
    module.exports.resolve.alias = {
        'react': 'react-lite',
        'react-dom': 'react-lite'
    };
}
