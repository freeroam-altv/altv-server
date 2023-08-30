import * as alt from "alt-server";

alt.on("playerDeath", (victim: alt.Player, killer: alt.Entity, weaponHash: number) => {
    if (victim.events?.playerDeath !== undefined) {
        return victim.events.playerDeath(victim, killer, weaponHash);
    }
})
