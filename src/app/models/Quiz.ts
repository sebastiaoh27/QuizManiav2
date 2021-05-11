export class Quiz {
  name: string;
  description: string;
  themeId: number;
  id: number;

  constructor(name: string,description: string,themeId: number,id?: number) {
    this.id = id;
    this.name = name;
    this.themeId = themeId;
    this.description = description;
  }
}
