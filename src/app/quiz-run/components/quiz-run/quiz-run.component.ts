import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizQuestion } from '../../../question/models/question.model';
import { Quiz } from '../../../quiz/models/quiz.model';
import { HeaderIconButtonComponent } from '../../../shared/components/header-icon-button.component';
import { QuestionStatus } from '../../models/question-status.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionRunComponent } from '../question-run/question-run.component';
import { QuizRunNavigationComponent } from '../quiz-run-navigation/quiz-run-navigation.component';

@Component({
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  imports: [
    MatIconModule,
    QuestionRunComponent,
    HeaderIconButtonComponent,
    QuizRunNavigationComponent,
    RouterModule,
    CommonModule,
  ],
})
export class QuizRunComponent implements OnInit, OnDestroy {
  quiz: Quiz | undefined;
  question!: QuizQuestion;

  currentQuestionIndex: number = 0;
  questionAnswered = false;
  quizRunFinished = false;

  questionStatuses: QuestionStatus[] = [];

  private currentQuestionSubscription: Subscription | undefined;

  @ViewChild('quizRunNavigation')
  quizRunNavigation: QuizRunNavigationComponent | undefined;

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

      setTimeout(() => {
        this.quizRunNavigation?.scrollToHighlight();
      }, 100);

      this.updateView();
    });

    this.quiz = this.quizRunService.getQuiz();
    this.quizRunService.answerChanged.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    this.currentQuestionSubscription?.unsubscribe();
  }

  onLeaveQuiz() {
    this.quizRunService.clearQuizRun();
    this.router.navigate(['/quizzes']);
  }

  onRevealAnswer() {
    this.quizRunService.setAnswer(this.currentQuestionIndex, 0);
  }

  onNextQuestion() {
    this.quizRunService.navigateToNextQuestion();
  }

  onNavigateQuestion(index: number) {
    this.quizRunService.navigateToQuestion(index);
  }

  private updateView() {
    this.quizRunFinished = this.quizRunService.isQuizRunFinished();
    this.questionAnswered =
      (this.quizRunService.getSelectedAnswer(this.currentQuestionIndex) ??
        -1) !== -1;
    this.questionStatuses = this.quizRunService.getQuestionStatuses();
  }
}
