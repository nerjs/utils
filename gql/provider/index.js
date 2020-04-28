const React = require('react')
const { ApolloProvider } = require('@apollo/react-hooks')
const createClient = require('../client')
const ErrorsContext = require('./ErrorsContext')

const Provider = ({ children, client, onError, ...clientOptions }) => {
    const [lastError, setLastError] = React.useState(null)
    const [apolloClient] = React.useState(
        () => client || createClient({ ...clientOptions, onError: onErrorHandler }),
    )

    const onErrorHandler = React.useCallback(
        err => {
            setLastError(err)
            return onError && typeof onError === 'function'
                ? onError(err)
                : err.forward(err.operation)
        },
        [onError, setLastError],
    )

    return React.createElement(
        ApolloProvider,
        { client: apolloClient },
        React.createElement(ErrorsContext.Provider, { value: { lastError } }, children),
    )
}

module.exports = Provider
