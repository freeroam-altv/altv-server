declare module "alt-server" {
  export interface Player {
    nickname: string;

    room: {
      type: string;
      id: number;
    }
  }
}
