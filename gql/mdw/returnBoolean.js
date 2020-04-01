const returnBooleanMiddleware = preventError => async (resolver, ...args) => {
    try {
        await resolver(...args)
        return true
    } catch (e) {
        if (preventError) return false
        throw e
    }
}

module.exports = returnBooleanMiddleware
