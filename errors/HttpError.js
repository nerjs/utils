const STATUS_CODES = require('./lib/statusCodes')

class HttpError extends Error {
    /**
     * @class
     * @name HttpError
     * @param {Number} code http status code
     * @param {String} message custom message
     */
    constructor(code, message) {
        const mess = message || HttpError.STATUS_CODES[code || 500]
        super(mess)

        this.message = mess
        this.code = code
        this.name = 'HttpError'
    }

    static STATUS_CODES = STATUS_CODES
}

module.exports = HttpError
