import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'https://quiz-maniav2.herokuapp.com'
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
  /// <reference lib="dom" />
  createQuestion(question: Question) {
    const headers = {'content-type':'application/json'};
    return this.http.post('/api/createQuestion',JSON.stringify(question), {headers});
  }



}
