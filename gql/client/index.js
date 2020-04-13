const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { ApolloLink } = require('apollo-link')
const { onError: onErrorLink } = require('apollo-link-error')
const createHttpLink = require('./createHttpLink')

const createClient = ({ uri, httpOptions, wsUri, wsOptions, links, onError }) => {
    const apolloLinks = [createHttpLink({ uri, httpOptions, wsUri, wsOptions })]

    if (links && Array.isArray(links)) apolloLinks.unshift(...links)

    if (onError && typeof onError === 'function') apolloLinks.unshift(onErrorLink(onError))

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: apolloLinks.length === 1 ? apolloLinks[0] : ApolloLink.from(apolloLinks),
    })

    return client
}

module.exports = createClient
