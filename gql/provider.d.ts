import { FC } from "react";
import {ClientOptions} from "./client";
import {ApolloClient} from "apollo-client";



export declare interface ApolloProviderProps {

    /** @description graphql server endpoint */
    uri: string;

    /** @description options for create apollo client */
    options?: ClientOptions
}

export declare interface ApolloProviderProps {

    /** @description Apollo client */
    client: ApolloClient<any>;
}

declare const GqlProvider: FC<ApolloProviderProps>;

export default GqlProvider
