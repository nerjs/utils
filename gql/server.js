const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const { applyMiddleware } = require('graphql-middleware')

const createGqlServer = ({ app, path, playground, types, resolvers, middlewares }) => {
    const executableSchema = makeExecutableSchema({
        typeDefs: mergeTypes(fileLoader(types)),
        resolvers: mergeResolvers(fileLoader(resolvers)),
    })

    const schema =
        middlewares && Array.isArray(middlewares)
            ? applyMiddleware(executableSchema, ...middlewares)
            : executableSchema

    const server = new ApolloServer({
        schema,
        playground: !!playground,
    })

    server.applyMiddleware({
        app,
        path,
    })

    return server
}

module.exports = createGqlServer
