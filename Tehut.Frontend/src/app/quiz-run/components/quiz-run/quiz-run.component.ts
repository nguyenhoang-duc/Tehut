import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from '../../../question/models/question.model';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionRunComponent } from '../question-run/question-run.component';

@Component({
  standalone: true,
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  imports: [MatIconModule, QuestionRunComponent],
})
export class QuizRunComponent implements OnInit {
  quiz: Quiz | undefined;
  question!: QuizQuestion;

  currentQuestionIndex: number = 0;

  get quizHeader() {
    return `${this.quiz?.name} (${this.currentQuestionIndex + 1}/${this.quiz?.questionCount ?? 0})`;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizRunService: QuizRunService
  ) {}

  ngOnInit(): void {
    this.currentQuestionIndex = +this.route.snapshot.queryParams['current'] - 1;

    this.route.queryParams.subscribe(
      (q) => (this.currentQuestionIndex = q['current'] - 1)
    );

    this.quiz = this.quizRunService.getQuiz();
  }

  onLeaveQuiz() {
    this.quizRunService.stopQuizRun();
    this.router.navigate(['/quizzes']);
  }
}
