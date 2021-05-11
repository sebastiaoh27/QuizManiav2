import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BigInteger} from '@angular/compiler/src/i18n/big_integer';
import {Room} from '../models/Room';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUsers() {
    return this.http.get('/api/users');
  }
  getUser(id: number) {
    return this.http.get('/api/user/'+id);
  }
  getUserInRoom(roomId: number) {
    return this.http.get('/api/users/'+ roomId);
  }
  getWinner(roomId: number) {
    return this.http.get('/api/winner/'+roomId);
  }
  patchPoints(id: number,points: number) {
    const headers = {'content-type':'application/json'};
    return this.http.patch('/api/increasePoints/'+id,JSON.stringify({points}),{headers});
  }
  patchResetPoints(roomId: number) {
    const headers = {'content-type':'application/json'};
    return this.http.patch('/api/resetPoints/'+roomId,'');
  }
  createUser(user: User) {
    const headers = {'content-type':'application/json'};
    return this.http.post('/api/createUser',JSON.stringify(user), {headers});
  }



}
