import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionAnswerComponent } from '../question-answer/question-answer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from '../../models/question.model';
import { QuizService } from '../../../quiz/services/quiz.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  imports: [QuestionAnswerComponent, FormsModule, ReactiveFormsModule],
})
export class QuestionViewComponent implements OnInit {
  private quizQuestion!: QuizQuestion;

  questionForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {
    const quizId = +route.snapshot.params['id'];
    const questionId = +route.snapshot.params['questionid'];
    const quiz = quizService.getQuizById(quizId);

    this.quizQuestion = quiz.questions[questionId];
  }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      question: new FormControl(this.quizQuestion.question),
      answer1: new FormControl(this.quizQuestion.answer1),
      answer2: new FormControl(this.quizQuestion.answer2),
      answer3: new FormControl(this.quizQuestion.answer3),
      answer4: new FormControl(this.quizQuestion.answer4),
      correctAnswerIndex: new FormControl(this.quizQuestion.correctAnswerIndex),
    });
  }

  onSubmit() {
    this.quizQuestion.question = this.questionForm.value['question'];
    this.quizQuestion.answer1 = this.questionForm.value['answer1'];
    this.quizQuestion.answer2 = this.questionForm.value['answer2'];
    this.quizQuestion.answer3 = this.questionForm.value['answer3'];
    this.quizQuestion.answer4 = this.questionForm.value['answer4'];
    this.quizQuestion.correctAnswerIndex =
      this.questionForm.value['correctAnswerIndex'];

    this.close();
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
