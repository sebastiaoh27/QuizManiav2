export class Room{

  name;
  id;
  password;

  constructor(name: string, id?: number, password?: string) {
    this.name = name ;
    if (id) {
      this.id = id;
      this.password = password;
    }
  }

}
