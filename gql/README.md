# Gql (apollo) config and utils

## Install 

```
npm i @nerjs/gql
```
or:
```
yarn add @nerjs/gql
```


## Use


### createClient()

create [Apollo client](https://www.apollographql.com/docs/react/get-started/#create-a-client).

```js
const createClient = require('@nerjs/gql/client')
// or
import createClient from '@nerjs/gql/client'


const client = createClient({/* ...clientOptions */})
```

#### clientOptions

|prop name|type|required|description|
|:--:|:--:|:--:|:--|
|***uri***|**String**|:white_check_mark:|Graphql server endpoint. Used in [HttpLink](https://www.apollographql.com/docs/link/links/batch-http/)|


### createGqlServer 

create [ApolloServer](https://www.apollographql.com/docs/apollo-server/api/apollo-server/)

```js
const createGqlServer = require('@nerjs/gql/server')

const server = createGqlServer({/* ...serverOptions */})
```

#### serverOptions

|prop name|type|required|description|
|:--:|:--:|:--:|:--|
|***app***|**[Application](https://expressjs.com/ru/4x/api.html#app)**|:white_check_mark:|Express application|
|***path***|**String**|:white_check_mark:|Graphql [uri endpoint](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)|
|***playground***|**Boolean**||Enable graphql [playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#gatsby-focus-wrapper)|
|***types***|**String**|:white_check_mark:|Path to graphql [types](https://github.com/Urigo/merge-graphql-schemas#merging-type-definitions). Used by [merge-graphql-schemas](https://github.com/Urigo/merge-graphql-schemas)|
|***resolvers***|**String**|:white_check_mark:|Path to graphql [resolvers](https://github.com/Urigo/merge-graphql-schemas#merging-resolvers). Used by [merge-graphql-schemas](https://github.com/Urigo/merge-graphql-schemas)|
|***middlewares***|**Array(Function \| Object)**||[graphql-middleware](https://github.com/prisma-labs/graphql-middleware)|




### GqlProvider

[React component](https://en.reactjs.org/docs/react-component.html). Wrap over [ApolloProvider](https://www.apollographql.com/docs/react/api/react-hooks/#apolloprovider).

```js
const GqlProvider = require('@nerjs/gql/provider')
// or
import GqlProvider from '@nerjs/gql/provider'
import React from 'react'


const App = () => {
    return <GqlProvider {.../* providerProps */} />
}
```

#### providerProps

|prop name|type|required|description|
|:--:|:--:|:--:|:--|
|***client***|**[ApolloClient](https://www.apollographql.com/docs/react/api/apollo-client/)**|:white_check_mark:| Required if not use uri prop|
|***uri***|**String**|:white_check_mark:| If not use client prop. A [client](https://www.apollographql.com/docs/react/api/apollo-client/) will be created using [createClient()](#createclient)|
|***options***|**[clientOptions](#clientoptions)**||Other client options if not use client prop|


### Scalars (resolvers)

```js
const { ...scalars } = require('@nerjs/gql/scalars')
```

* DateResolver (scalar `Date`)
* NumberResolver (scalar `Number`)

---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)
