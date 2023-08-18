export interface Room {
  roomType: string;
  subRoomsCount: number;
  subRoomsStartsFrom: number;
  subRooms: SubRoom[];
}

interface SubRoom {
  slots: number,
  players: number[],
}
