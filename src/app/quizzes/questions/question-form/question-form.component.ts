import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Quiz} from '../../../../models/quiz.model';
import {Question} from '../../../../models/question.model';
import {QuizService} from '../../../../services/quiz.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: [''],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  addQuestion() {
    // We retrieve here the question object from the questionForm and we cast the type "as Question".
    const questionToAdd: Question = {...this.questionForm.getRawValue()} as Question;

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add question: ', questionToAdd);

    // Now, add your quiz in the list!
    this.quizService.addQuestion(this.quiz, questionToAdd);

    // We clear the form and the answers
    this.questionForm.reset();
    this.answers.clear();
  }
}
