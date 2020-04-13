const { createContext } = require('react')

const ErrorsContext = createContext({
    lastError: null,
})

module.exports = ErrorsContext
