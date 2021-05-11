import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CreateRoomComponent} from './components/create-room/create-room.component';
import {CreateQuizComponent} from './components/create-quiz/create-quiz.component';
import {ContactComponent} from './components/contact/contact.component';
import {HostRoomComponent} from './components/host-room/host-room.component';
import {UserRoomComponent} from './components/user-room/user-room.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'createRoom', component: CreateRoomComponent},
  { path: 'createQuiz', component: CreateQuizComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'hostRoom', component: HostRoomComponent},
  { path: 'userRoom', component: UserRoomComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
