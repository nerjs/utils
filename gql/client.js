const { BatchHttpLink } = require('apollo-link-batch-http')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')

const createClient = ({ uri }) => {
    const httpLink = new BatchHttpLink({ uri })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    })

    return client
}

module.exports = createClient
