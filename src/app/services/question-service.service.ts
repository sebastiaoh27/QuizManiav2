import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BigInteger} from '@angular/compiler/src/i18n/big_integer';
import {Room} from '../models/Room';
import {User} from '../models/User';
import {Quiz} from '../models/Quiz';
import {Question} from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {

  }

  getQuestions() {
    return this.http.get('/api/questions');
  }
  getQuestion(id: number) {
    return this.http.get('/api/question/'+id);
  }
  getQuestionsInQuiz(quizId: number) {
    return this.http.get('/api/questions/'+ quizId);
  }
  createQuestion(question: Question) {
    const headers = {'content-type':'application/json'};
    return this.http.post('/api/createQuestion',JSON.stringify(question), {headers});
  }



}
