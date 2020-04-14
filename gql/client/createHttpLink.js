const { BatchHttpLink } = require('apollo-link-batch-http')
const { WebSocketLink } = require('apollo-link-ws')
const { getMainDefinition } = require('apollo-utilities')
const { split } = require('apollo-link')

const createHttpLink = ({ uri, httpOptions = {}, wsUri, wsOptions = {} }) => {
    const httpLink = new BatchHttpLink({ uri, ...httpOptions })

    if (!wsUri) return httpLink

    const wsLink = new WebSocketLink({
        uri: wsUri,
        options: {
            reconnect: true,
            lazy: true,
            ...wsOptions,
        },
    })

    return split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            )
        },
        wsLink,
        httpLink,
    )
}

module.exports = createHttpLink
