import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { QuestionAnswerComponent } from '../question-answer/question-answer.component';
import { TextButtonComponent } from '../../../shared/components/text-button.component';

@Component({
  standalone: true,
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  imports: [
    QuestionAnswerComponent,
    FormsModule,
    ReactiveFormsModule,
    TextButtonComponent,
  ],
})
export class QuestionEditComponent implements OnInit {
  private quizQuestion!: QuizQuestion;

  questionForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizQuestion = this.questionService.getQuestionById(
      this.route.snapshot.params['questionid']
    )!;

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

    this.questionService.updateQuizQuestion(
      this.quizQuestion.id,
      this.quizQuestion
    );
    this.close();
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
