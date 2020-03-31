const GqlError = require('./GqlError')

class ForbiddenGqlError extends GqlError {
    constructor(message) {
        super(message || 'Forbidden', GqlError.codes.FORBIDDEN)
    }

    get name() {
        return 'ForbiddenGqlError'
    }

    static code = GqlError.codes.FORBIDDEN
}

module.exports = ForbiddenGqlError
