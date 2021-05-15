import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {Dialog} from '../host-room/host-room.component';
import {UserService} from '../../services/user-service.service';
import {RoomService} from '../../services/room-service.service';
import {Room} from '../../models/Room';
import {QuizService} from '../../services/quiz-service.service';
import {QuestionService} from '../../services/question-service.service';

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.css'],
  providers: [MatTabsModule,MatListModule,MatSelectModule,MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule]
})
export class UserRoomComponent implements OnInit {

  room
  user
  playerLoader
  users
  waiting
  done
  selectedQuiz
  reset
  questions
  next
  roomChecker
  quizSelected
  questionNumber


  constructor(private dialog: MatDialog,private userService: UserService, private roomService: RoomService,
              private quizService: QuizService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.waiting = true
    this.room = JSON.parse(sessionStorage.getItem('room'));
    if (!sessionStorage.getItem('user')) {
      let name = '';
      const d = this.dialog.open(Dialog, {
        width: '400px',
        height: '250px',
        data: {name}
      });

      d.afterClosed().subscribe(result => {
        name = result;
        this.userService.createUser(new User(name,this.room.id,0,'user')).subscribe(res=>{
          this.user = res;
          sessionStorage.setItem('user',JSON.stringify(this.user));
        });
      });
    } else {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (this.user.roomId !== this.room.id) {
        this.userService.createUser(new User(this.user.name,this.room.id,0,this.user.role)).subscribe(res=>{
          sessionStorage.setItem('user',JSON.stringify(res))
          this.user = res
        })
      }
    }
    this.playerLoader = interval(1000)
      .pipe(
        startWith(0),
        switchMap(()=> this.userService.getUserInRoom(this.room.id))
      ).subscribe(res => {
        this.users = [];
        // tslint:disable-next-line:forin
        for (const i in res) {
          this.users.push(res[i]);
        }
        this.users.sort((a,b)=>b.points-a.points);
      });
    this.roomChecker = interval(100)
      .pipe(
        startWith(0),
        switchMap(()=> this.roomService.getRoom(this.room.id)))
      .subscribe(res =>{
        this.room = res
        sessionStorage.setItem('room',JSON.stringify(res))
        if (this.room.questionNumber !== 0 && this.room.questionNumber !== this.questionNumber) {
          this.next = true
          this.questionNumber = this.room.questionNumber
        }
        if (this.room.selectedQuiz !== -1 && this.waiting){
          this.quizService.getQuiz(this.room.selectedQuiz).subscribe(response=>{
            this.selectedQuiz = response
            this.questionService.getQuestionsInQuiz(this.selectedQuiz.id).subscribe(r=>{
              this.questions = []
              for (const i in r){
                this.questions.push(r[i])
              }
              this.waiting = false
              this.next = true
              this.quizSelected = true
            })
          })
        }else if (this.room.selectedQuiz === -1){
          this.reset = true
          this.questions = []
          this.selectedQuiz = undefined
          this.quizSelected = false
          this.waiting = true
          this.done = false
        }
      })
  }
  ngOnDestroy(): void {
    this.playerLoader.unsubscribe();
    this.roomChecker.unsubscribe();
  }

}


