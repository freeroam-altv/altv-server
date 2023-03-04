import * as alt from "alt-server";
import { newConfiguration } from "./utils/config/config";

const err = await newConfiguration(".env");
if (err !== null) {
  alt.logError(err);
}
