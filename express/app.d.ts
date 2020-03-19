import { Application } from "express";
import { OptionsUrlencoded } from "body-parser";

export = createApp


declare interface ExpressAppConfig {

    /**
     * @description logger morgan
     * @default dev
     */
    logger?: 'combined' | 'dev' | 'tiny' | 'short';
    logger?: string | Function;


    /** @description path to views dir */
    views?: string; 

    /**
     * @description use body-parser.json()
     * @default true
     */
    bodyJson?: boolean;

    /**
     * @description use body-parser.urlencoded()
     * @default true
     */
    bodyUrlcoded?: boolean | OptionsUrlencoded;

    /**
     * @description use cookie-parser
     * @default true
     */
    cookies?: boolean;

    /** @description use serve-favicon */
    favicon?: string;

    /**
     * @description use express.static()
     */
    static?: string | [string];
}

declare function createApp(config: ExpressAppConfig): Application;