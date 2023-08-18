import * as alt from "alt-server";

import { serverStarted } from "./framework/index";

import "./framework/types/index";

import "./framework/events/index";

alt.on("serverStarted", serverStarted);
