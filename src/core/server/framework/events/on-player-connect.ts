import * as alt from "alt-server";
import * as framework from "../index";

const handlePlayerConnect = (player: alt.Player) => {
    if (!player.valid) return;

    alt.log(`[${player.id}] ${player.name} connected to server.`);

    player.model = "mp_m_freemode_01";
    framework.roomManager.connectToLobby(player);
};

alt.on("playerConnect", handlePlayerConnect);
