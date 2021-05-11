import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BigInteger} from '@angular/compiler/src/i18n/big_integer';
import {Room} from '../models/Room';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://quiz-maniav2.herokuapp.com'
  constructor(private http: HttpClient) {

  }

  getUsers() {
    return this.http.get(this.url+'/api/users');
  }
  getUser(id: number) {
    return this.http.get(this.url+'/api/user/'+id);
  }
  getUserInRoom(roomId: number) {
    return this.http.get(this.url+'/api/users/'+ roomId);
  }
  getWinner(roomId: number) {
    return this.http.get(this.url+'/api/winner/'+roomId);
  }
  patchPoints(id: number,points: number) {
    const headers = {'content-type':'application/json'};
    return this.http.patch(this.url+'/api/increasePoints/'+id,JSON.stringify({points}),{headers});
  }
  patchResetPoints(roomId: number) {
    const headers = {'content-type':'application/json'};
    return this.http.patch(this.url+'/api/resetPoints/'+roomId,'');
  }
  createUser(user: User) {
    const headers = {'content-type':'application/json'};
    return this.http.post(this.url+'/api/createUser',JSON.stringify(user), {headers});
  }



}
