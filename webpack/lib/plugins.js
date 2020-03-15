const webpack = require('webpack')
const DotEnv = require('dotenv-webpack')

module.exports = ({ env, dotEnv, reactHot }) => {
    const plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            ...Object.keys(env).reduce((e, c) => ({ ...e, [c]: JSON.stringify(env[c]) }), {}),
        }),
    ]

    if (dotEnv) plugins.push(new DotEnv())

    if (reactHot) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return plugins
}
