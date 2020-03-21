import {ApolloClient} from "apollo-client";
import { ApolloServer } from "apollo-server-express";
import {Application} from "express";
import { IMiddleware, IMiddlewareFieldMap, IMiddlewareFunction } from "graphql-middleware";


declare module '@nerjs/gql/client' {


    declare interface ClientOptions {

        /** @description graphql server endpoint */
        uri: string;
    }

    export default function createClient(options: ClientOptions): ApolloClient<TCacheShape>;
}

declare module '@nerjs/gql/server' {

    declare interface GqlServerOptions {

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

    export default function createGqlServer(options:GqlServerOptions): ApolloServer;
}

declare module '@nerjs/gql/provider' {


    declare interface ClientOptions {

        /** @description graphql server endpoint */
        uri: string;
    }

    declare interface ApolloProviderProps {

        /** @description graphql server endpoint */
        uri: string;
    
        /** @description options for create apollo client */
        options?: ClientOptions
    }

    declare interface ApolloProviderProps {

        /** @description Apollo client */
        client: ApolloClient<any>;
    }

    
    declare const GqlProvider: FC<ApolloProviderProps>;

    export default GqlProvider
}