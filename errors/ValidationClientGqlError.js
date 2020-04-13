const ClientGqlError = require('./ClientGqlError')

class ValidationClientGqlError extends ClientGqlError {
    constructor(message, path, extensions) {
        super(message, path, extensions)

        this.errors = (Array.isArray(this.errors) && this.errors) || []
        this.map = (this.map && typeof this.map === 'object') || {}

        this.code = ValidationClientGqlError.codes.VALIDATION
        this.hasResults = !!this.errors.length
    }

    get name() {
        return 'ValidationClientGqlError'
    }

    static parseServerGqlError(err, path) {
        return super.parseServerGqlError(
            err,
            path,
            ValidationClientGqlError.codes.VALIDATION,
            'Validation Error',
            true,
        )
    }
}

module.exports = ValidationClientGqlError
