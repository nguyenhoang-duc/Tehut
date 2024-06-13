import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from '../../../question/models/question.model';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionRunComponent } from '../question-run/question-run.component';
import { Subscription } from 'rxjs';
import { HeaderIconButtonComponent } from '../../../shared/components/header-icon-button.component';

@Component({
  standalone: true,
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  imports: [MatIconModule, QuestionRunComponent, HeaderIconButtonComponent],
})
export class QuizRunComponent implements OnInit, OnDestroy {
  quiz: Quiz | undefined;
  question!: QuizQuestion;

  currentQuestionIndex: number = 0;
  questionAnswered = false;

  private currentQuestionSubscription: Subscription | undefined;

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

    this.currentQuestionSubscription = this.route.queryParams.subscribe((q) => {
      this.currentQuestionIndex = q['current'] - 1;
      this.updateView();
    });

    this.quiz = this.quizRunService.getQuiz();
    this.quizRunService.answerChanged.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    this.currentQuestionSubscription?.unsubscribe();
  }

  onLeaveQuiz() {
    this.quizRunService.stopQuizRun();
    this.router.navigate(['/quizzes']);
  }

  onRevealAnswer() {
    this.quizRunService.setAnswer(this.currentQuestionIndex, 0);
  }

  private updateView() {
    this.questionAnswered =
      (this.quizRunService.getSelectedAnswer(this.currentQuestionIndex) ??
        -1) !== -1;
  }
}
