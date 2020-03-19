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

const app = createApp({/* ...appConfig */})
```

returns [express app](https://expressjs.com/en/4x/api.html#app)

#### appConfig:

|prop name|type|default|description|
|:--|:--:|:--:|:--|
|***logger***|**String** \| **Function**|`'dev'`| settings for [morgan](https://github.com/expressjs/morgan#readme) |
|***views***|**String**|| path to [views](https://expressjs.com/en/guide/using-template-engines.html) dir. View engine: [ejs](https://github.com/tj/ejs) |
|***bodyJson***|**Boolean**|`true`| use [body-parser](https://github.com/expressjs/body-parser) method [json()](https://github.com/expressjs/body-parser#bodyparserjsonoptions) |
|***bodyUrlcoded***|**Boolean** \| **[Object](https://github.com/expressjs/body-parser#options-3)** |`true`| use [body-parser](https://github.com/expressjs/body-parser) method [urlencoded()](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions) |
|***cookies***|**Boolean**|`true`|use [cookie-parser](https://github.com/expressjs/cookie-parser#readme)|
|***favicon***|**String**||path to faficon. Use [serve-favicon](https://github.com/expressjs/serve-favicon#readme)|
|***static***|**String** \| **[String]** || use [express.static()](https://expressjs.com/ru/4x/api.html#express.static) |


### createHmrApp 

Create [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) with express

returns [express app](https://expressjs.com/en/4x/api.html#app)

```js
const createHmrApp = require('@nerjs/express/hmr')
```

#### create express app with HMR:
use default [appConfig](#appconfig)
```js
const app = createHmrApp(pathToWebpackConfig)
```

#### add HMR to [express app](https://expressjs.com/en/4x/api.html#app)
```js
const app = createHmrApp(app, pathToWebpackConfig)
```


#### create express app with config and HMR

accepts a [appConfig](#appconfig) as the first argument

```js
const app = createHmrApp(appConfig, pathToWebpackConfig)
```


### isExpressApp
```js
const isExpressApp = require('@nerjs/express/lib/isExpressApp')
const express = require('express')

const app = express()


isExpressApp(app) == true
isExpressApp({}) == false
```

---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)
