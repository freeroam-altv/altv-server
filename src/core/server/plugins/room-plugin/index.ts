import * as alt from "alt-server";

import { Room } from "./index.d";

let rooms: Room[] = [];

const internal = {
    connectToRoom: (player: alt.Player, roomType: string, roomId: number): boolean => {
        player.room = {
            type: roomType,
            id: roomId,
        };

        if (roomType === "lobby") {
            player.dimension = roomId;
            return true;
        }

        if (!internal.getRoom(roomType)) {
            internal.logWarning("room not found");
        }

        return true;
    },

    getRoom: (roomType: string): Room | boolean => {
        return rooms.find((room: Room) => room.roomType === roomType) ?? false;
    },

    getLastRoom: (): Room => {
        return rooms.pop();
    },

    getLobbySubRoomsCount: (): number => {
        return alt.getServerConfig().players + 1;
    },

    log: (...message: any[]) => {
        alt.log("[room-plugin]", ...message);
    },

    logWarning: (...message: any[]) => {
        alt.logWarning("[room-plugin]", ...message);
    },
};

export const connectToLobby = (player: alt.Player) => {
    internal.connectToRoom(player, "lobby", player.id);
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
};

export const connectToDeathMatch = (player: alt.Player, roomId: number) => {
    internal.connectToRoom(player, "deathmatch", roomId);
};

export const addRoom = (roomType: string, subRoomsCount: number) => {
    if (internal.getRoom(roomType)) {
        internal.logWarning(`room with type ${roomType} is existed`);
        return;
    }

    let lastRoom = internal.getLastRoom();
    let subRoomsStartsFrom = 0;

    if (!lastRoom) {
        subRoomsStartsFrom = internal.getLobbySubRoomsCount() + 1;
    } else {
        subRoomsStartsFrom = lastRoom.subRoomsStartsFrom + lastRoom.subRoomsCount + 1;
    }

    rooms.push({
        roomType: roomType,
        subRoomsCount: subRoomsCount + 1,
        subRoomsStartsFrom: subRoomsStartsFrom,
        subRooms: [],
    });

    internal.log(`room with type '${roomType}' successfully created`);
};

export const getRooms = (): Room[] => {
    return rooms;
};
