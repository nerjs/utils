const { BatchHttpLink } = require('apollo-link-batch-http')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')

const createClient = ({ uri, ...options }) => {
    const httpLink = new BatchHttpLink({ uri, ...options })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    })

    return client
}

module.exports = createClient
