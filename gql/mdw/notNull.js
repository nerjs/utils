const NotFoundGqlError = require('@nerjs/errors/NotFoundGqlError')

const notNullMiddleware = message => async (resolver, ...args) => {
    const res = await resolver(...args)
    if (res === null) throw new NotFoundGqlError(message)
    return res
}

module.export = notNullMiddleware
