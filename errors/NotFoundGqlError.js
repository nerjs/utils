const GqlError = require('./GqlError')

class NotFoundGqlError extends GqlError {
    constructor(message) {
        super(message || 'Not found', GqlError.codes.NOT_FOUND)
    }

    get name() {
        return 'NotFoundGqlError'
    }

    static code = GqlError.codes.NOT_FOUND
}

module.exports = NotFoundGqlError
