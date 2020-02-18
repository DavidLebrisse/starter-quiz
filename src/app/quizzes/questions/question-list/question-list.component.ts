import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {QuizService} from '../../../../services/quiz.service';
import {Question} from '../../../../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  public quiz: Quiz;

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizees) => this.quiz = quizees[quizees.indexOf(this.quiz)]);
  }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    console.log(question);
    this.quizService.deleteQuestion(this.quiz, question);
  }
}
