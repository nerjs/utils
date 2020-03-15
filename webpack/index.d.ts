import {WebpackOptions} from 'webpack/declarations/WebpackOptions'


declare function createWebpackConfig(settings: WCSettings): WebpackOptions;


declare interface WCSettings {

    /** @description webpack.config context prop */
    context: string,

    /** @description webpack.config entry name prop */
    name: string,

    /** @description webpack.config entry path prop */
    entryPath: string,

    /** @description webpack.config output path prop */
    outputPath: string,

    /** 
     * @description webpack.config output publick path prop 
     * @default "/"
     * */
    publicPath?: string,

    /** 
     * @description webpack.config output filename prop 
     * @default "./js/[name].js"
     * */
    outputFilename?: string,

    /** 
     * @description webpack.config watch prop 
     * @default process.env.NODE_ENV !== 'production'
     * */
    watch?: boolean,

    /** 
     * @description webpack.config mode prop 
     * @default process.env.NODE_ENV || 'development'
     * */
    mode: 'production' | 'development' | 'test',

    /** 
     * @description webpack.config devtool prop 
     * @default process.env.NODE_ENV === 'production' ? false : 'inline-source-map'
     * */
    devtool: string,

    /** 
     * @description Has react preset in babel module.rule 
     * @default false
     * */
    react?: boolean,

    /** 
     * @description Has react-hot-loader presets and plugins 
     * @default false
     * */
    reactHot?: boolean,

    /** 
     * @description Add graphql module to rules 
     * @default false
     * */
    gql?: boolean,

    /** 
     * @description Has styled-components to babel plugins 
     * @default false
     * */
    styled?: boolean,

    /** 
     * @description Schema babel module target in preset-env 
     * @default { browsers: 'last 3 versions' }
     * */
    targets?: {[key: string]: any},

    /** 
     * @description Environment thrown into a bundle. All variables are wrapped in JSON.stringify() 
     * @default { 'process.env.NODE_ENV': process.env.NODE_ENV,  NODE_ENV: process.env.NODE_ENV }
     * */
    env?: {[key: string]: any},

    /** 
     * @description Has webpack plugin dotenv-webpack 
     * @default false
     * */
    dotEnv?: boolean,
}

export = createWebpackConfig
