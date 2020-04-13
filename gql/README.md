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
|***httpOptions***|**Object**|| Other options [HttpLink](https://www.apollographql.com/docs/link/links/batch-http/#options)|
|***wsUri***|**String**||Graphql server websocket endpoint. Used in [WebSocketLink](https://www.apollographql.com/docs/link/links/ws/)|
|***wsOptions***|**Object**|| Other otions [WebSocketLink](https://www.apollographql.com/docs/link/links/ws/#options)|
|***links***|**Array**|| Array of [ApolloLinks](https://www.apollographql.com/docs/link/)|
|***onError***|**Function**||errorHandler for [apollo-link-error](https://www.apollographql.com/docs/link/links/error/)|

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
|***cors***|||
|***formatError***|||
|***context***|||
|***subscriptions***|||




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

1. ***client***: (**[ApolloClient](https://www.apollographql.com/docs/react/api/apollo-client/)**): Required if not use [clientOptions](#clientoptions)

or:

2. `{...options}` **[clientOptions](#clientoptions)**

### useGqlErrors

```js
const useGqlErrors = require('@nerjs/gql/useGqlErrors')
// or
import useGqlErrors from '@nerjs/gql/useGqlErrors'

const { lastError } = useGqlErrors()
```

> Returns the last error
> Does not work outside the [GqlProvider](#gqlprovider) or when using the [first option](#providerprops)

---

### Scalars (resolvers)

```js
const { ...scalars } = require('@nerjs/gql/scalars')
```

* DateResolver (scalar `Date`)
* NumberResolver (scalar `Number`)

### gql middlewares

```js
const { ...middlewares } = require('@nerjs/gql/mdw')
```

#### validate middleware

```js
const validateMiddleware = require('@nerjs/gql/mdw/validate')


const schemaMiddlewares = {
    Query: {
        getItem: validateMiddleware({ input: yupInputSchema }),
        getItems: validateMiddleware(yupInputSchema)
    }
}
```

> Used [yup](https://github.com/jquense/yup#readme) validation
> default **errorWrapper** [YupGqlError](https://github.com/nerjs/utils/tree/master/errors#yupgqlerror)

***Custom (not yup) validation***

> The schema must have a `.validate(input)` method

```js
const { createValidateMiddleware } = require('@nerjs/gql/mdw/validate')

const validateMiddleware = createValidateMiddleware({
    isSchemaField: '__isYupSchema__', // The property of an object, by which it is clear that this is a validator scheme
    schemaOptions: { abortEarly: false },
    errorWrapper: Error
})
```

#### notNull middleware

> Prevents return NULL

```js
const notNullMiddleware = require('@nerjs/gql/mdw/notNull')

const schemaMiddlewares = {
    User: {
        getUser: notNullMiddleware('User not found' /* error message */)
    }
}
```

> throw [NotFoundGqlError(message)](https://github.com/nerjs/utils/tree/master/errors#notfoundgqlerror) if resolver return null

#### onlyId middleware 

> Prevents unnecessary resolver calls

```js
const onlyIdMiddleware = require('@nerjs/gql/mdw/onlyId')

const schemaMiddlewares = {
    Post: {
        author: onlyIdMiddleware()
    }
}
```

#### returnBoolean middleware

> Returns a boolean value depending on the success of the resolver. 
> If `preventError` is specified as true - returns false instead of an exception

```js
const returnBooleanMiddleware = require('@nerjs/gql/mdw/returnBoolean')

const schemaMiddlewares = {
    Post: {
        author: onlyIdMiddleware(/* preventError = false */)
    }
}
```

### combine middlewares

> Combines and launches middlewares

```js
const combineMiddlewares = require('@nerjs/gql/mdw/combine')

const schemaMiddlewares = {
    Post: {
        author: combine(
            onlyIdMiddleware(),
            notNullMiddleware('Not foud author')
        )
    }
}
```


---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)
