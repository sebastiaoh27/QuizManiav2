import {Room} from "../models/Room";
import {User} from "../models/User";

export class RoomManager {
  private static _room: Room | undefined
  private static _user: User | undefined

  static get room(): Room {
    return <Room>this._room;
  }

  static set room(value: Room) {
    this._room = value;
  }

  static get user(): User {
    return <User>this._user;
  }

  static set user(value: User) {
    this._user = value;
  }
}
