import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BigInteger} from '@angular/compiler/src/i18n/big_integer';
import {Room} from '../models/Room';
import {User} from '../models/User';
import {Quiz} from '../models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = 'https://quiz-maniav2.herokuapp.com'
  constructor(private http: HttpClient) {

  }

  getQuizzes() {
    return this.http.get('/api/quizzes');
  }
  getQuiz(id: number) {
    return this.http.get('/api/quiz/'+id);
  }
  getQuizzesInTheme(themeId: number) {
    return this.http.get('/api/quizzes/'+ themeId);
  }
  createQuiz(quiz: Quiz) {
    const headers = {'content-type':'application/json'};
    return this.http.post('/api/createQuiz',JSON.stringify(quiz), {headers});
  }



}
