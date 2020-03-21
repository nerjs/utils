import {ApolloClient} from "apollo-client";

export = createClient

declare namespace createClient2 {
    export declare interface ClientOptions2 {

        /** @description graphql server endpoint */
        uri: string;
    } 
}

declare function createClient2(options: createClient.ClientOptions2): ApolloClient<any>;