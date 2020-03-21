const React = require('react')
const { ApolloProvider } = require('@apollo/react-hooks')
const createClient = require('./client')

const Provider = ({ uri, client, options = {}, children }) => {
    const apolloClient = client || createClient({ uri, ...options })

    return React.createElement(ApolloProvider, { client: apolloClient }, children)
}

module.exports = Provider
