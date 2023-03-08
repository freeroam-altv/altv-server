import * as alt from "alt-client";
alt.onServer("log:Console", handleLogConsole);
function handleLogConsole(msg) {
    alt.log(msg);
}
export { handleLogConsole };
