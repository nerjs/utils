import { ApolloServer } from "apollo-server-express";
import {Application} from "express";
import { IMiddleware, IMiddlewareFieldMap, IMiddlewareFunction } from "graphql-middleware";

//app, path, playground, types, resolvers, middlewares
export declare interface GqlServerOptions {

    /** @description Express application */
    app: Application;

    /** @description Graphql endpoint */
    path: string;

    /** @description Enable graphql playground */
    playground?: boolean;

    /** @description Path to graphql types */
    types: string;
    
    /** @description Path to graphql resolvers */
    resolvers: string;

    middlewares?: [IMiddlewareFieldMap | IMiddlewareFunction | IMiddleware]
}

declare function createGqlServer(options:GqlServerOptions): ApolloServer

export default createGqlServer