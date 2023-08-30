import * as alt from "alt-server";

import * as framework from "./framework/index";

import { initDeathMatchPlugin } from "./plugins/deathmatch-plugin/index";

import "./framework/types/index";

import "./framework/events/index";

framework.addPlugins({
    name: "deathmatch-plugin",
    callback: initDeathMatchPlugin,
});

alt.on("serverStarted", framework.serverStarted);
