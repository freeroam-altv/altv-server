import * as alt from "alt-server";

alt.onClient("veh:spawn", (player: alt.Player, model: string) => {
    alt.log(model);
    let vehicle = new alt.Vehicle(model, player.pos, player.rot);
    vehicle.numberPlateText = "altv";
    vehicle.dimension = player.dimension
});

alt.onClient("dev:pos", (player: alt.Player) => {
    alt.log(
      `[dev:pos] [${player.name}] Pos: [${player.pos.x}, ${player.pos.y}, ${player.pos.z}], `+
      `Rot: [${player.rot.x}, ${player.rot.y}, ${player.rot.z}]`
    );
});
