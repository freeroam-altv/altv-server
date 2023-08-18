import * as alt from "alt-server";
import { connectToLobby } from "../room-manager/index";

const handlePlayerConnect = (player: alt.Player) => {
    if (!player.valid) return;

    alt.log(`[${player.id}] ${player.name} connected to server.`);

    player.model = "mp_m_freemode_01";
    connectToLobby(player);
};

alt.on("playerConnect", handlePlayerConnect);
