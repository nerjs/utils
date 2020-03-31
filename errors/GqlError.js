const gqlCodes = require('./lib/gqlCodes')

class GqlError extends Error {
    constructor(message, code, details, originalError) {
        super(message)

        this.extensions = { code }

        if (details && typeof details === 'object') {
            if (details.code) {
                details._code = details.code
                delete details.codeƒ
            }
            Object.keys(details).forEach(key => {
                this.extensions[key] = details[key]
            })
        }

        if (originalError) {
            this.originalError = originalError
            this.stack = originalError.stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    get name() {
        return 'GqlError'
    }

    static codes = gqlCodes
    static code = gqlCodes.UNKNOWN

    static is(err) {
        if (!err) return false
        if (err instanceof this || err.originalError instanceof this) return true
        if (typeof err === 'string') return err === this.code
        if (typeof err !== 'object') return false

        return !!(err.extensions && err.extensions.code === this.code)
    }
}

module.exports = GqlError
