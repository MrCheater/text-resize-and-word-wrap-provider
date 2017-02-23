var webpack = require('webpack');

module.exports = {
    entry: './examples/client.js',
    output: {
        path: './docs',
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
    plugins: (process.env.NODE_ENV === 'production') ? [
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
    ] : [],
    watch : !(process.env.NODE_ENV === 'production')
};

if(process.env.TARGET === 'preact') {
    module.exports.resolve.alias = {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
    };
    module.exports.output.filename = 'preact-demo.js';
    module.exports.output.publicPath = '/preact-demo.js';
} else if(process.env.TARGET === 'react-lite') {
    module.exports.resolve.alias = {
        'react': 'react-lite',
        'react-dom': 'react-lite'
    };
    module.exports.output.filename = 'react-lite-demo.js';
    module.exports.output.publicPath = '/react-lite-demo.js';
} else {
    module.exports.output.filename = 'react-demo.js';
    module.exports.output.publicPath = '/react-demo.js';
}
