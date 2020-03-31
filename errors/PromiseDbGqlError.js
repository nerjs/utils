const DbGqlError = require('./DbGqlError')

class PromiseDbGqlError extends Promise {
    constructor(cb) {
        super((resolve, reject) => {
            cb(resolve, err => reject(err instanceof DbGqlError ? err : new DbGqlError(err)))
        })
    }
}

module.exports = PromiseDbGqlError
