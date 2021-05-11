import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {QuizService} from '../../../services/quiz-service.service';
import {RoomService} from '../../../services/room-service.service';
import {QuestionService} from '../../../services/question-service.service';

@Component({
  selector: 'app-three-line-select-list',
  templateUrl: './three-line-select-list.component.html',
  styleUrls: ['./three-line-select-list.component.css']
})
export class ThreeLineSelectListComponent{

  constructor(private roomService: RoomService, private questionService: QuestionService) {}

  @Input('room')room
  @Output('roomOutput') rOut = new EventEmitter<any>()
  @Input('quizSelected') quizSelected
  @Input('waiting') waiting
  @Output('quizSelectedOutput') qSOut = new EventEmitter<any>()
  @Output('waitingOutput') wOut = new EventEmitter<any>()
  @Output('quizOutput') selectedQuiz = new EventEmitter<any>()
  @Input('quizzes') quizzes = []
  questions
  @Output('questionsOut') qOut = new EventEmitter<any>()
  icons = ['public','science','history_edu','color_lens','sports_soccer','movies']
  quiz;

  async selectQuiz() {
    this.waiting = true
    this.quiz = this.quiz[0]
    this.roomService.setSelectedQuiz(this.quiz.id,this.room.id).subscribe(res=>{
      this.room = res
      sessionStorage.setItem('room',JSON.stringify(res))
      this.rOut.emit(this.room)
    })

    this.questionService.getQuestionsInQuiz(this.quiz.id).subscribe(res => {
      this.questions = [];
      // tslint:disable-next-line:forin
      for (const r in res) {
        this.questions.push(res[r]);
      }
      this.qOut.emit(this.questions)
      this.selectedQuiz.emit(this.quiz)
      this.wOut.emit(false)
      this.qSOut.emit(true)
    });

  }


}
