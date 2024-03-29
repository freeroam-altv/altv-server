import * as alt from "alt-server";

alt.log(`alt:V Server - Boilerplate Started`);
alt.on("playerConnect", handlePlayerConnect);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = "mp_m_freemode_01";
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    alt.emitClient(player, "log:Console", "alt:V Server - Boilerplate Started");
}

alt.onClient("veh:spawn", (player: alt.Player, model: string) => {
    let vehicle = new alt.Vehicle(model, player.pos, player.rot);
    vehicle.numberPlateText = "f-ro.am";
});

alt.on("playerDamage", (victim, attaker, healthDamage, armourDamage, weaponHash) => {
    alt.log(victim.name, JSON.stringify(attaker), healthDamage, armourDamage, weaponHash);
    victim.health = 200;
});
