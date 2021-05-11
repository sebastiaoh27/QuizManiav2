import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MatSidenavModule,MatListModule,MatIconModule,MatButtonModule]
})
export class AppComponent {

  title = 'QuizMania';
  icons =['home', 'add_circle',];
  fillerNav = [['home','Home','/'],['add_circle','Create / Join','/createRoom'],['quiz','Create Quiz','/createQuiz'],['phone','Contact Us','/contact']];
  showFiller = false;
}
