import * as alt from "alt-server";
import * as framework from "../../framework/index";

import { PluginData } from "./index.d";

const logger = framework.initLogger("deathmatch-plugin");

const PLUGIN_NAME = "deathmatch";

let pluginData: PluginData = {
    subRoomsCount: 2,
};

export const initDeathMatchPlugin = (): boolean => {
    logger.logInfo(`Initialize plugin`);
    framework.roomManager.addRoom(PLUGIN_NAME, pluginData.subRoomsCount);
    framework.roomManager.addSubRoom(PLUGIN_NAME, 10);

    return true;
};
