const { ApolloServer, ApolloError } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const { applyMiddleware } = require('graphql-middleware')
const DbGqlError = require('@nerjs/errors/DbGqlError')
const logger = require('nlogs')(module)

const createGqlServer = ({
    app,
    path,
    playground,
    types,
    resolvers,
    middlewares,
    cors,
    formatError,
    context,
    subscriptions,
}) => {
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
        cors,
        context,
        subscriptions,
        formatError: err => {
            if (process.env.NODE_ENV === 'production') {
                if (DbGqlError.is(err)) {
                    logger.error(err)
                    err = new ApolloError(
                        'Something went wrong',
                        DbGqlError.codes.INTERNAL_SERVER_ERROR,
                    )
                }

                const { code, exception, ...details } = err.extensions
                return new ApolloError(err.message, code, details)
            }

            return formatError && typeof formatError === 'function' ? formatError(err) : err
        },
    })

    server.applyMiddleware({
        app,
        path,
        cors,
    })

    return server
}

module.exports = createGqlServer
