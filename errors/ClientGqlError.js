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

        this.name = 'ClientGqlError'
    }

    get name() {
        return 'ClientGqlError'
    }

    static codes = gqlCodes

    static equalPaths = (firstPath, secondPath, recursive) => {
        if (Array.isArray(firstPath)) return equalPaths(firstPath.join('.'), secondPath, recursive)
        if (Array.isArray(secondPath)) return equalPaths(firstPath, secondPath.join('.'), recursive)

        return recursive ? firstPath.search(secondPath) === 0 : firstPath === secondPath
    }

    static parseServerGqlError = (err, needPath, code, defaultMessage, recursive) => {
        const { message, path, extensions } = (err.graphQLErrors || []).find(
            gErr =>
                this.equalPaths(gErr.path, needPath, recursive) && gErr?.extensions?.code === code,
        ) || { message: defaultMessage }

        return new this(message, path, extensions)
    }
}

module.exports = ClientGqlError
