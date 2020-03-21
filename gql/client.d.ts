import {ApolloClient} from "apollo-client";

export = createClient

declare namespace createClient {
    export declare interface ClientOptions {

        /** @description graphql server endpoint */
        uri: string;
    } 
}

declare function createClient(options: createClient.ClientOptions): ApolloClient<any>;