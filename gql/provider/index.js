const React = require('react')
const { ApolloProvider } = require('@apollo/react-hooks')
const createClient = require('../client')
const ErrorsContext = require('./ErrorsContext')

const Provider = ({ children, client, onError, ...clientOptions }) => {
    const [lastError, setLastError] = React.useState(null)
    const clientRef = React.useRef(null)

    const onErrorHandler = React.useCallback(
        err => {
            setLastError(err)
            return onError && typeof onError === 'function' ? onError(err) : err
        },
        [onError, setLastError],
    )

    if (!clientRef.current) {
        clientRef.current = client || createClient({ ...clientOptions, onError: onErrorHandler })
    }

    return React.createElement(
        ApolloProvider,
        { client: clientRef.current },
        React.createElement(ErrorsContext.Provider, { value: { lastError } }, children),
    )
}

module.exports = Provider
