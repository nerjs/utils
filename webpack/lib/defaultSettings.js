module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    publicPath: '/',
    outputFilename: './js/[name].js',
    watch: process.env.NODE_ENV !== 'production',
    react: false,
    reactHot: false,
    gql: false,
    styled: false,
    targets: { browsers: 'last 3 versions' },
    env: {
        'process.env.NODE_ENV': process.env.NODE_ENV,
        NODE_ENV: process.env.NODE_ENV,
    },
    dotEnv: false,
}
