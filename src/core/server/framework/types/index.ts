declare module "alt-server" {
    export interface Player {
        nickname: string;

        events: {
            playerDeath: (victim: Player, killer: null | Entity, weaponHash: number) => void,
        },

        room: {
            type: string;
            id: number;
        }
    }
}
