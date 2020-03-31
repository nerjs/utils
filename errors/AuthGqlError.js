const GqlError = require('./GqlError')

class AuthGqlError extends GqlError {
    constructor(message) {
        super(message || 'Unauthorized', GqlError.codes.AUTH)
    }

    get name() {
        return 'AuthGqlError'
    }

    static code = GqlError.codes.AUTH
}

module.exports = AuthGqlError
