import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {stringify} from 'querystring';
import {Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  // private calledURL = 'https://api.myjson.com/bins/silu2';
  private calledURL = 'https://api.myjson.com/bins/13ajhy';

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    quiz.id = this.quizzes.length.toString();
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    let removeIdx: number;
    removeIdx = this.quizzes.indexOf(quiz);
    this.quizzes.splice(removeIdx, 1);
    this.quizzes$.next(this.quizzes);
  }

  private setQuizzes(quizzes: Quiz[]) {
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);
  }

  private setQuizzesAndIds(quizzes: Quiz[ ]) {
    for (let i = 0; i < quizzes.length; i++) {
      quizzes[i].id = i.toString();
    }
    this.setQuizzes(quizzes);
  }

  setQuizzesFromUrl() {
    this.http.get<{ quizzes: Quiz[ ] }>(this.calledURL).subscribe((quizzesObj) => this.setQuizzes(quizzesObj.quizzes));
  }


  deleteQuestion(quiz: Quiz, question: Question) {
    let quizIdx: number;
    quizIdx = this.quizzes.indexOf(quiz);
    let questionIdx: number;
    questionIdx = this.quizzes[quizIdx].questions.indexOf(question);
    this.quizzes[quizIdx].questions.splice(questionIdx, 1);
    this.quizzes$.next(this.quizzes);
  }

  addQuestion(quiz: Quiz, questionToAdd: Question) {
    let quizIdx: number;
    quizIdx = this.quizzes.indexOf(quiz);
    this.quizzes[quizIdx].questions.push(questionToAdd);
    this.quizzes$.next(this.quizzes);
  }
}
