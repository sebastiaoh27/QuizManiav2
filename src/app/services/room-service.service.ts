import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BigInteger} from '@angular/compiler/src/i18n/big_integer';
import {Room} from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = 'https://quiz-maniav2.herokuapp.com'
  constructor(private http: HttpClient) {

  }

  getRooms() {
    return this.http.get(this.url+'/api/rooms/');
  }

  getRoom(id: number) {
    return this.http.get(this.url+'/room/'+id);
  }

  getJoinRoom(password: string) {
    return this.http.get(this.url+'/api/joinRoom/'+password);
  }

  createRoom(body: Room){
    const headers = {'content-type':'application/json'};
    return this.http.post<any>(this.url+'/api/createRoom',JSON.stringify(body),{headers});
  }

  setSelectedQuiz(quizId: number, roomId: number) {
    return this.http.patch(this.url+'/api/selectQuiz/'+roomId, JSON.stringify({quizId}))
  }



}
