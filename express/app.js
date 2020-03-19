const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const serveFavicon = require('serve-favicon')
const merge = require('merge')
const appDefaults = require('./lib/appDefaults')

const createApp = (_settings = {}) => {
    if (!_settings || typeof _settings !== 'object') throw new Error('Settings must be an object')

    const settings = merge.recursive({}, appDefaults, _settings)

    const app = express()

    if (settings.logger !== false) app.use(morgan(settings.logger))

    // VIEWS SETTINGS
    if (settings.views) {
        app.set('views', settings.views)
        app.set('view engine', 'ejs')
    }

    // BODY PARSING SETTINGS
    if (settings.bodyJson) app.use(bodyParser.json())
    if (settings.bodyUrlcoded)
        app.use(
            bodyParser.urlencoded(
                typeof settings.bodyUrlcoded === 'object'
                    ? settings.bodyUrlcoded
                    : { extended: false },
            ),
        )

    // COOKIES SETTINGS
    if (settings.cookies) app.use(cookieParser())

    // FAVICON SETTINGS
    if (settings.favicon) app.use(serveFavicon(settings.favicon))

    // STATIC SETTINGS
    if (settings.static) {
        const staticFiles = Array.isArray(settings.static) ? settings.static : [settings.static]
        staticFiles.forEach(staticFile => {
            app.use(express.static(staticFile))
        })
    }

    return app
}


module.exports = createApp
