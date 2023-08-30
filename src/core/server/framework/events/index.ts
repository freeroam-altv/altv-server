import * as alt from "alt-server";

import "./on-player-connect";
import "./player-death";

if (alt.debug) {
  import("./dev");
}
