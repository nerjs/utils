const ValidationGqlError = require('./ValidationGqlError')

class YupGqlError extends ValidationGqlError {
    constructor(err) {
        super(err.message, {
            errors: err.errors,
            map: err.inner
                ? err.inner.reduce((prev, { path, message }) => {
                      prev[path] = message

                      return prev
                  }, {})
                : {},
        })

        this.inner = err.inner
    }
}

module.exports = YupGqlError
