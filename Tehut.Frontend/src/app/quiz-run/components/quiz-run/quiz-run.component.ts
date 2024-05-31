import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunSession } from '../../models/quiz-run-session.model';
import { QuestionRunComponent } from '../question-run/question-run.component';
import { QuizQuestion } from '../../../question/models/question.model';

@Component({
  standalone: true,
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  imports: [MatIconModule, QuestionRunComponent],
})
export class QuizRunComponent implements OnInit {
  quiz!: Quiz;
  question!: QuizQuestion;

  currentQuestionIndex: number = 0;

  private session!: QuizRunSession;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.session = JSON.parse(localStorage.getItem('quizRunSession')!);

    this.quiz = this.session.quiz;
    this.question = this.session.questions[this.session.currentQuestionIndex];
  }
}
