import { Application } from "express";
import { ExpressAppConfig } from "./app";

export = createHmrApp


declare function createHmrApp(configPath: string): Application;
declare function createHmrApp(config: ExpressAppConfig, configPath: string): Application;
declare function createHmrApp(app: Application, configPath: string): Application;