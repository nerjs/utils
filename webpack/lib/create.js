const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = ({
    context,
    name,
    mode,
    devtool,
    entryPath,
    outputPath,
    publicPath,
    outputFilename,
}) => ({
    context,
    entry: {
        [name]: entryPath,
    },
    output: {
        filename: outputFilename,
        path: outputPath,
        publicPath,
    },

    mode,
    devtool,

    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn'],
                    },
                    ie8: false,
                    warnings: false,
                    output: {
                        comments: false,
                        webkit: true,
                        max_line_len: 200,
                    },
                },
                extractComments: {
                    condition: () => '',
                },
            }),
        ],
    },
})
