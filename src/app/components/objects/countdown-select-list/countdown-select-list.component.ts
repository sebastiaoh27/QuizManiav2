import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {interval} from 'rxjs';
import {UserService} from '../../../services/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomService} from '../../../services/room-service.service';


@Component({
  selector: 'app-countdown-select-list',
  templateUrl: './countdown-select-list.component.html',
  styleUrls: ['./countdown-select-list.component.css']
})
export class CountdownSelectListComponent implements OnChanges{

  constructor(private userService: UserService,private _snackbar: MatSnackBar, private roomService: RoomService) {}

  @Input('quizSelected') quizSelected
  @Output('quizSelectedOutput') qSOut = new EventEmitter<any>()
  @Input('waiting')waiting
  timer = 100
  answer
  question
  answers
  @Input('questions') questions
  maxPoints
  @Input('next')next
  @Output('nextOut') nOut = new EventEmitter<any>()
  questionNumber = 0
  @Output('qNOut') qNOut = new EventEmitter<any>()
  questionLoader
  clock
  @Input('reset')reset
  @Output('done') done = new EventEmitter<any>()
  @Output('resetOut') rOut = new EventEmitter<any>()
  @Output('qOut') qOut = new EventEmitter<any>()
  @Output('selectedQuiz') sQOut = new EventEmitter<any>()

  ngOnChanges(changes:SimpleChanges) {
    if (this.reset) {
      this.timer = 100
      this.questionNumber = 0
      this.qNOut.emit(0)
      this.roomService.setQuestionNumber(0,JSON.parse(sessionStorage.getItem('room')).id).subscribe(res=>{
        sessionStorage.setItem('room',JSON.stringify(res))
      })
      this.rOut.emit(false)
      this.qOut.emit([])
      this.qSOut.emit(undefined)
      this.questions = undefined
      this.answers = undefined
      this.question = undefined
      if (this.clock)this.clock.unsubscribe()
    }
    if (this.next && this.questionNumber < this.questions.length) {
      if (this.timer < 100 && JSON.parse(sessionStorage.getItem('user')).role === 'host') {
        this._snackbar.open('Please wait for the current question to finish!',null,{duration: 3000})
      } else {
        if (this.clock)this.clock.unsubscribe()
        this.nOut.emit(false)
        this.loadQuestion()
        this.timer = 100
      }
    }
    if (this.next && this.timer <100 && JSON.parse(sessionStorage.getItem('user')).role === 'host' ){
      this.nOut.emit(false)
    }

  }



  async loadQuestion() {
    this.question = this.questions[this.questionNumber];
    this.answers = [[this.question.a1, {}], [this.question.a2, {}], [this.question.a3, {}], [this.question.a4, {}]];
    this.questionNumber++
    this.qNOut.emit(this.questionNumber)
    this.roomService.setQuestionNumber(this.questionNumber,JSON.parse(sessionStorage.getItem('room')).id).subscribe(res=>{
      sessionStorage.setItem('room',JSON.stringify(res))
    })
    this.clock = interval(100).subscribe(()=> {
      this.timer--
    });
    await this.sleep(11000)
    this.clock.unsubscribe()
    if (this.timer <= 0){
      this.showAnswer()
      this.timer = 100;
      await this.sleep(10000)
      if ( this.questions && this.questionNumber >= this.questions.length) {
        this.done.emit(true)
      }
    }

  }


  showAnswer() {
    if (this.answer && this.answer[0] !== this.question.correct) {
      this.answers[this.answer[0] - 1][1] = {'backgroundColor': '#ff8581'}
    } else if (this.answer){
      this.userService.patchPoints(JSON.parse(sessionStorage.getItem('user')).id,this.maxPoints).subscribe(res =>
        sessionStorage.setItem('user',JSON.stringify(res))
      )
    }
    this.answers[this.question.correct-1][1] = { 'backgroundColor': '#89ff81'}
    this.answer = undefined
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectAnswer() {
    this.maxPoints = this.timer * 7
  }

}
