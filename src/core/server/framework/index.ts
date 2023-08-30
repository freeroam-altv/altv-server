import * as alt from "alt-server";

import { Logger } from "./logger/index";

import * as plugin from "./plugin/index";

import { PluginData, Plugin } from "../plugins/index.d";

const logger = new Logger("framework");

export const maxPlayers: number = alt.getServerConfig().players;
export const plugins: PluginData[] = plugin.plugins;

export function initLogger (serviceName: string): Logger {
    return new Logger(serviceName);
}

export const addPlugins = (...plgns: Plugin[]) => {
    plugin.loadPlugins(plgns)
};

export const serverStarted = () => {
    logger.logInfo("Server started");

    plugin.initPlugins();
};

export * as roomManager from "./room-manager/index";
