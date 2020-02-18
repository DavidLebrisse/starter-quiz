import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  selectedQuiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    public quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.quizzes$
      .subscribe(quizzes => this.selectedQuiz = quizzes.filter(e => e.id === id.toString())[0]);
  }

}
