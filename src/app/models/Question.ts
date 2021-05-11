export class Question {
  id: number
  name: string
  quizId: number
  a1: string
  a2: string
  a3: string
  a4: string
  correct: number

  constructor(name: string,quizId: number,a1: string,a2: string,a3: string,a4: string,correct: number,id?: number) {
    this.a1 = a1
    this.a2 = a2
    this.a3 = a3
    this.a4 = a4
    this.correct = correct
    this.name = name
    this.quizId = quizId
    if (id) {
      this.id = id
    }
  }
}
