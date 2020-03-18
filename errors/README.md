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



---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)