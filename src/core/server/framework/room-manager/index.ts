import * as alt from "alt-server";

import { Logger } from "../logger";

import { Room } from "./index.d";

let logger: Logger = new Logger("room-manager");
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

        const room = internal.getRoom(roomType);
        if (room === undefined) {
            logger.logWarning("room not found");
            return false;
        }

        if (room.subRoomsCount > roomId) {
            logger.logWarning("'roomId' incorrect")
        }

        if (room.subRooms.length > 0 && roomId > 0) {
            player.dimension = room.subRoomsStartsFrom + roomId;

            room.subRooms[roomId - 1].players.push(player.id);
        } else {
            player.dimension = room.subRoomsStartsFrom;
        }

        return true;
    },

    getRoom: (roomType: string): Room => {
        return rooms.find((room: Room) => room.roomType === roomType);
    },

    getLastRoom: (): Room => {
        return rooms.pop();
    },

    getLobbySubRoomsCount: (): number => {
        return alt.getServerConfig().players + 1;
    }
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
        logger.logWarning(`room with type ${roomType} is existed`);
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

    logger.log(`room with type '${roomType}' successfully created`);
};

export const addSubRoom = (roomType: string, slots: number): boolean => {
    const room = internal.getRoom(roomType);
    if (room === undefined) {
        logger.logWarning("room not found");
        return false;
    }

    room.subRooms.push({
        slots: slots,
        players: [],
    });
    return true;
}

export const getRooms = (): Room[] => {
    return rooms;
};
