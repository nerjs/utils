const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware') 
const createApp = require('./app')
const isExpressApp = require('./lib/isExpressApp')


const getApp = (...args) => {
    console.log(args.map(a => typeof a))
    if (typeof args[0] !== 'string' && typeof args[1] !== 'string') 
        throw new Error('createHmrApp method should receive, as an argument, the path to the webpack config')
    
    if (typeof args[0] === 'string') return getApp({}, args[0])
    if (typeof args[0] !== 'object' && typeof args[0] !== 'function') return getApp({}, args[1])
    if (!isExpressApp(args[0])) return getApp(createApp(args[0]), args[1])

    return args
}

const createHmrApp = (...args) => {
    const [app, configPath] = getApp(...args)

    const config = require(configPath)
    const compiler = webpack(config)

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            noInfo: true,
            stats: {
                colors: true,
            },
        }),
    )
    app.use(webpackHotMiddleware(compiler))

    return app
}

module.exports = createHmrApp