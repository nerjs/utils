const merge = require('merge')
const create = require('./lib/create')
const rules = require('./lib/rules')
const plugins = require('./lib/plugins')
const defaultSettings = require('./lib/defaultSettings')

const createWebpackConfig = settings => {
    const {
        context,
        mode,
        devtool,
        name,
        watch,
        entryPath,
        outputPath,
        outputFilename,
        publicPath,
        react,
        reactHot,
        gql,
        styled,
        targets,
        env,
        dotEnv,
    } = merge.recursive({}, defaultSettings, settings)

    const config = create({
        context,
        mode,
        devtool,
        name,
        entryPath,
        outputPath,
        publicPath,
        outputFilename,
    })

    config.watch = !!watch

    config.module = {
        rules: rules({ react, reactHot, gql, styled, targets }),
    }

    config.plugins = plugins({ env, dotEnv, reactHot })

    if (reactHot) {
        config.entry[name] = [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            config.entry.main,
        ]
    }

    return config
}

module.exports = createWebpackConfig
