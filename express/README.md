# express configs

## Install
```
npm i @nerjs/exress
```
or:
```
yarn add @nerjs/express
```

## Use

### createApp
```js
const createApp = require('@nerjs/express/app')

const app = createApp({/* ...config */})
```

returns [express app](https://expressjs.com/en/4x/api.html#app)

#### config:

|prop name|type|default|description|
|:--|:--:|:--:|:--|
|***logger***|**String** \| **Function**|`'dev'`| settings for [morgan](https://github.com/expressjs/morgan#readme) |
|***views***|**String**|| path to [views](https://expressjs.com/en/guide/using-template-engines.html) dir. View engine: [ejs](https://github.com/tj/ejs) |
|***bodyJson***|**Boolean**|`true`| use [body-parser](https://github.com/expressjs/body-parser) method [json()](https://github.com/expressjs/body-parser#bodyparserjsonoptions) |
|***bodyUrlcoded***|**Boolean** \| **[Object](https://github.com/expressjs/body-parser#options-3)** |`true`| use [body-parser](https://github.com/expressjs/body-parser) method [urlencoded()](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions) |
|***cookies***|**Boolean**|`true`|use [cookie-parser](https://github.com/expressjs/cookie-parser#readme)|
|***favicon***|**String**||path to faficon. Use [serve-favicon](https://github.com/expressjs/serve-favicon#readme)|
|***static***|**String** \| **[String]** || use [express.static()](https://expressjs.com/ru/4x/api.html#express.static) |


---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)
