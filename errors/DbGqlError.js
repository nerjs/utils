const GqlError = require('./GqlError')

class DbGqlError extends GqlError {
    constructor(err) {
        super(err.message, GqlError.codes.DB, { ...err }, err)
    }

    get name() {
        return 'DbGqlError'
    }

    static code = GqlError.codes.DB
}

module.exports = DbGqlError
