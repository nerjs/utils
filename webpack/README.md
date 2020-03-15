# frequently used webpack config

## Install

```
npm i @nerjs/webpack
```
or
```
yarn add @nerjs/webpack
```

## Use
```js
const createWebpackConfig = require('@nerjs/webpack')
// or es6:
import { createWebpackConfig } from '@nerjs/webpack'

const config = createWebpackConfig({ /* ...settings */ })
```

---

## Settings: 

| propName | type | required | default | description |
|:--|:--:|:--:|:--:|:--|
| ***context*** | **String** |:white_check_mark:||  webpack.config [context](https://webpack.js.org/configuration/entry-context/#context) prop |
| ***name*** | **String** |:white_check_mark:|| webpack.config [entry name](https://webpack.js.org/configuration/entry-context/#entry) prop |
| ***entryPath*** | **String** |:white_check_mark:|| webpack.config [entry path](https://webpack.js.org/configuration/entry-context/#entry) prop |
| ***outputPath*** | **String** |:white_check_mark:|| webpack.config [output path](https://webpack.js.org/configuration/output/#outputpath) prop |
| ***publicPath*** | **String** || `'/'` | webpack.config [output publick path](https://webpack.js.org/configuration/output/#outputpublicpath) prop |
| ***outputFilename*** | **String** || `'./js/[name].js'` | webpack.config [output filename](https://webpack.js.org/configuration/output/#outputfilename) prop |
| ***watch*** | **Boolean** || `process.env.NODE_ENV !== 'production'` | webpack.config [watch](https://webpack.js.org/configuration/watch/#watch) prop |
| ***mode*** | **String** || `process.env.NODE_ENV || 'development'` | webpack.config [mode](https://webpack.js.org/configuration/mode/) prop |
| ***devtool*** | **String** || `process.env.NODE_ENV === 'production' ? false : 'inline-source-map'` | webpack.config [devtool](https://webpack.js.org/configuration/devtool/) prop |
| ***react*** | **Boolean** || `false` | Has [react preset](https://babeljs.io/docs/en/babel-preset-react) in babel module.rule |
| ***reactHot*** | **Boolean** || `false` | Has react-hot-loader [presets](https://www.npmjs.com/package/react-hot-loader), [plugins](https://webpack.js.org/plugins/hot-module-replacement-plugin/) and [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) |
| ***gql*** | **Boolean** || `false` | Add [graphql module](https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader) to rules |
| ***styled*** | **Boolean** || `false` | Has [styled-components](https://github.com/styled-components/babel-plugin-styled-components) to babel plugins |
| ***targets*** | **Object** || `{ browsers: 'last 3 versions' }` | Schema babel module [target](https://babeljs.io/docs/en/babel-preset-env#targets) in preset-env |
| ***env*** | **Object** || `{ 'process.env.NODE_ENV': process.env.NODE_ENV,  NODE_ENV: process.env.NODE_ENV }` | Environment thrown into a bundle ([webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/)). All variables are wrapped in `JSON.stringify()` |
| ***dotEnv*** | **Boolean** || `false` | Has webpack plugin [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) |


---


#### [:link: All utils ](https://github.com/nerjs/utils#readme)