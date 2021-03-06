# Custom errors

## Install
```
npm i @nerjs/errors
```
or:
```
yarn add @nerjs/errors
```

## Use

### HttpError 

```js
const HttpError = require('@nerjs/errors/HttpError')

const error = new HttpError(404) // HttpError: Not found

console.log(error) // { code: 404, message: 'Not Found' }
```

**all status codes:**
```js
HttpError.STATUS_CODES
```

## Gql Errors

> Errors designed to integrate into the [Apollo server](https://www.apollographql.com/docs/apollo-server/)

### GqlError 

```js
const GqlError = require('@nerjs/errors/GqlError')

new GqlError(message: String, code: String, datails?: Object, originalError?: Error)

```

#### codes

***GqlError.codes***

```js
{
    FORBIDDEN: 'FORBIDDEN',
    AUTH: 'UNAUTHORIZED',
    GRAPHQL_VALIDATION: 'GRAPHQL_VALIDATION_FAILED',
    VALIDATION: 'VALIDATION',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    DB: 'DB_ERROR',
    NOT_FOUND: 'NOT_FOUND_ERROR',
    UNKNOWN: 'UNKNOWN',
}
```

#### .is(err)

***resolver.js:***
```js
Query = {
    test: () => throw new GqlError('message')
}
```

***app.js***

```js
new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => { 
    console.log(GqlError.is(err)) // true
    return err;
  },
})
```

### AutGqlError 

> @nerjs/errors/AutGqlError 
> extends [GqlError](#gqlerror)
> code: ***GqlError.codes.AUTH***
> props: `message: String`

### ForbiddenGqlError

> @nerjs/errors/ForbiddenGqlError 
> extends [GqlError](#gqlerror)
> code: ***GqlError.codes.FORBIDDEN***
> props: `message: String`

### DbGqlError

> @nerjs/errors/DbGqlError 
> extends [GqlError](#gqlerror)
> code: ***GqlError.codes.DB***
> props: `err: Error`

### NotFoundGqlError

> @nerjs/errors/NotFoundGqlError 
> extends [GqlError](#gqlerror)
> code: ***GqlError.codes.NOT_FOUND***
> props: `message: String`

### ValidationGqlError

> @nerjs/errors/ValidationGqlError 
> extends [GqlError](#gqlerror)
> code: ***GqlError.codes.VALIDATION***
> props: `message: String`, `details: Object`
> prop.details: `{errors: Array, map: Object}`

**example:**
```js
new ValidationGqlError('Validation failed', {
    errors: [
        'character limit exceeded',
        'Invalid value'
    ],
    map: {
        firstField: 'character limit exceeded',
        secondField: 'Invalid value'
    }
})
```

### YupGqlError

> @nerjs/errors/YupGqlError 
> extends [ValidationGqlError](#validationgqlerror)
> code: ***GqlError.codes.VALIDATION***
> props: `err: Error`

converts [yup ValidationError](https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string) to GqlError


## helpers

### PromiseDbGqlError 

> @nerjs/errors/PromiseDbGqlError 
> extends **Promise**
> all thrown exceptions are wrapped in [DbGqlError](#dbgqlerror)

**example:**

**db.js**

```js
mongoose.Promise = PromiseDbGqlError

mongoose.model('Users', new mongoose.Schema({ /* ... */ }))
```

***resolver.js:***
```js
Query = {
    test: () => User.create({/* ... */}) // throw Error
}
```

***app.js***

```js
new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => { 
    console.log(DbGqlError.is(err)) // true
    return err;
  },
})
```

## Client Gql errors

> Parsing and conversion of client errors that come from the [Apollo server](https://www.apollographql.com/docs/apollo-server/)

> [Error Codes](#codes) Used 

### ClientGqlError


```js
const ClientGqlError = require('@nerjs/errors/ClientGqlError')

new ClientGqlError(message: String, path: Array<String> | String , extensions = {})

```

***ClientGqlError.codes*** equal [Server codes](#codes)

#### ClientGqlError.parseServerGqlError()

> parse server errors.

> Find error in [graphQLErrors](https://www.apollographql.com/docs/react/data/error-handling/)

**Params**

|name|type|description|
|:--:|:--:|:--|
|err|`Error`| Array of errors [graphQLErrors](https://www.apollographql.com/docs/react/data/error-handling/) |
|path| `String` \|\| `Array<String>`| query path|
|code|`Strind` | [Error code](#codes)|
|defaultMessage|`String`|If no error is found|
|strict|`Boolean`|A way to compare paths when searching|

***recursive:***

```js
const graphQLErrors = [
  {
    "message": "Unauthorized",
    "locations": [/* ... */],
    "path": [
      "user",
      "id"
    ],
    "extensions": {
      "code": "UNAUTHORIZED",
      "exception": { /* ... */ }
    }
  }
]

ClientGqlError.parseServerGqlError(
  graphQLErrors,
  'user', // or ['user']
  'UNAUTHORIZED'
  'Default message',
  false
) // Not found. Returns new ClientGqlError(Default message)

ClientGqlError.parseServerGqlError(
  graphQLErrors,
  'user', // or ['user']
  'UNAUTHORIZED'
  null,
  false
) // Not found. Returns NULL

ClientGqlError.parseServerGqlError(
  graphQLErrors,
  ['user', 'id'],
  'UNAUTHORIZED'
  'Default message',
  false
) // Successfully Found Error. Returns new ClientGqlError(...)

ClientGqlError.parseServerGqlError(
  graphQLErrors,
  'user', // or ['user']
  'UNAUTHORIZED'
  'Default message',
  true // STRICT
) // Successfully Found Error. Returns new ClientGqlError(...)
```

### ValidationClientGqlError 

> extends [ClientGqlError](#clientgqlerror)

```js
const ValidationClientGqlError = require('@nerjs/errors/ValidationClientGqlError')

new ValidationClientGqlError(message: String, path: Array<String> | String , extensions = {})
```

***ValidationClientGqlError.parseServerGqlError(graphQLErrors, path)***


---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)