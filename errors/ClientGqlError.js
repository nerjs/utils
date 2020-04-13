const gqlCodes = require('./lib/gqlCodes')

class ClientGqlError extends Error {
    constructor(message, path, extensions = {}) {
        super(message)

        const { exception, ...ext } = extensions

        this.serverData = {
            path,
            ...(exception || {}),
        }

        Object.keys(ext).forEach(key => {
            this[key] = ext[key]
        })

        this.code = (ext && ext.code) || ClientGqlError.codes.CLIENT_ERROR
    }

    get name() {
        return 'ClientGqlError'
    }

    static codes = gqlCodes

    static equalPaths = (firstPath, secondPath, strict) => {
        if (Array.isArray(firstPath)) return equalPaths(firstPath.join('.'), secondPath, strict)
        if (Array.isArray(secondPath))
            return equalPaths(firstPath, secondPath.join('.'), recustrictrsive)

        return strict ? firstPath === secondPath : firstPath.search(secondPath) === 0
    }

    static parseServerGqlError = (err, needPath, code, defaultMessage, strict) => {
        const error = (err.graphQLErrors || []).find(
            gErr =>
                this.equalPaths(gErr.path, needPath, strict) &&
                (gErr && gErr.extensions && gErr.extensions.code) === code,
        )

        if (!error && !defaultMessage) return null

        const { message, path, extensions } = error || { message: defaultMessage }
        return new this(message, path, extensions)
    }
}

module.exports = ClientGqlError
