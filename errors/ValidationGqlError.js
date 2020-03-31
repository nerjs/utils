const GqlError = require('./GqlError')

class ValidationGqlError extends GqlError {
    constructor(message, details = {}) {
        const { map, errors } = details

        super(message || 'Unauthorized', GqlError.codes.VALIDATION, {
            errors: errors && Array.isArray(errors) ? errors : [],
            map: map && typeof map === 'object' ? map : {},
        })
    }

    get name() {
        return 'ValidationGqlError'
    }

    static code = GqlError.codes.VALIDATION
}

module.exports = ValidationGqlError
