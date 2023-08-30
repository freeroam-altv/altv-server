import * as framework from "../index";

import { Plugin, PluginData } from "./index.d";

const logger = framework.initLogger("plugin");

export let plugins: PluginData[] = [];

const internal = {
    plugins: <Plugin[]>[],
};

export const loadPlugins = (plgns: Plugin[]) => {
    for (let index = 0, length = plgns.length; index < length; index++) {
        internal.plugins.push(plgns[index]);
    }
};

export const initPlugins = () => {
    for (let index = 0, length = internal.plugins.length; index < length; index++) {
        // TODO: GET PLUGIN DATA FROM API!
        plugins.push({
            name: internal.plugins[index].name, // TODO: INSERT FROM PLUGIN DATA
        });
        internal.plugins[index].callback();
    }

    logger.logInfo(`${plugins.length} initialized successfully`);
};
