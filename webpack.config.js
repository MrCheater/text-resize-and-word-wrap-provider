var webpack = require('webpack');

module.exports = {
    entry: ['./src/demo/client.js'],
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
