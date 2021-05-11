import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {RoomService} from '../../services/room-service.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Room} from '../../models/Room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';






@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
  providers: [MatFormFieldModule, MatButtonModule, MatInputModule, MatRadioModule, MatSnackBar, RoomService]
})
export class CreateRoomComponent{
  options: string[] = ['Join', 'Create'];
  option = 'Join';
  roomName = '';

  // tslint:disable-next-line:variable-name
  constructor(private service: RoomService, private _snackBar: MatSnackBar, private _router: Router) {
  }

  // tslint:disable-next-line:typedef
  joinCreate() {
    if (this.option === 'Join') {this.join(); }
    else { this.create(); }
  }

  join() {

    this.service.getJoinRoom(this.roomName).subscribe({
      next: res => {
        if (!res) {this._snackBar.open('The room code is wrong or the room was deleted',null,{duration:3000});}
        else {
          sessionStorage.setItem('room',JSON.stringify(res));
          this._router.navigate(['/userRoom']);
        }
      },
      error: err => {
        this._snackBar.open('The room code is wrong or the room was deleted',null,{duration:3000});
      }
    });
  }

  create() {
    const room = new Room(this.roomName);

    this.service.createRoom(room).subscribe((res) => {
      sessionStorage.setItem('room',JSON.stringify(res));
      this._router.navigate(['/hostRoom']);
    });
  }

}
