import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from '../../models/User';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user-service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {QuizService} from '../../services/quiz-service.service';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RoomService} from '../../services/room-service.service';
import {QuestionService} from '../../services/question-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

export interface Data {
  name: string;
}

@Component({
  selector: 'app-host-room',
  templateUrl: './host-room.component.html',
  styleUrls: ['./host-room.component.css'],
  providers: [MatTabsModule,MatListModule,MatSelectModule,MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule]
})
export class HostRoomComponent implements OnInit, OnDestroy{
  playerLoader: Subscription;
  room;
  user;
  users;
  quizzes;
  theme = 6;
  themes = ['Geography','Science','History','Arts','Sports','Entertainment','All']
  questions;
  question;
  answers;
  quizSelected = false;
  selectedQuiz
  waiting = false;
  next
  reset = false
  done


  constructor(private activatedRoute: ActivatedRoute,private userService: UserService,
              private quizService: QuizService, private dialog: MatDialog, private clipBoard: Clipboard, private _snackBar: MatSnackBar,
              private roomService: RoomService, private  questionService: QuestionService,private cd: ChangeDetectorRef) {}



  ngOnInit(): void {
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
        this.userService.createUser(new User(name,this.room.id,0,'host')).subscribe(res=>{
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
    this.loadQuizzes()

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
        this.users.sort((a,b)=>a.points-b.points);
      });
  }
  ngOnDestroy(): void {
    this.playerLoader.unsubscribe();
  }

  loadQuizzes() {
    this.quizzes = []
    if (this.theme !== 6) {
      this.quizService.getQuizzesInTheme(this.theme).subscribe( res => {
        // tslint:disable-next-line:forin
        for (const r in res) {
          this.quizzes.push(res[r]);
        }
      });
    } else {
      this.quizService.getQuizzes().subscribe(res => {
        // tslint:disable-next-line:forin
        for (const r in res) {
          this.quizzes.push(res[r]);
        }
      });
    }
  }
  copyToClipboard(s) {
    this.clipBoard.copy(s);
    this._snackBar.open('Password copied to clipboard',null,{duration:3000});
  }
  setTheme() {
    this.loadQuizzes()
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  toQuizPage() {
    this.roomService.setSelectedQuiz(-1,this.room.id).subscribe(res=>{
      this.room = res
      sessionStorage.setItem('room',JSON.stringify(res))
      this.quizSelected = false
      this.waiting = false
      this.selectedQuiz = undefined
      this.reset = true
      this.next = false
      this.loadQuizzes()
    })
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  providers: [MatDialogModule]
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {}

}
