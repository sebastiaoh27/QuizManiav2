export class User {


  name: string;
  id: number;
  roomId: number;
  points: number;
  role: string;


  constructor(name: string, roomId: number, points: number, role: string, id?: number) {
    this.name = name;
    this.roomId = roomId;
    this.points = points;
    this.role = role;
    if (id) {
      this.id = id;
    }
  }
}
