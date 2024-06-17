import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionStatus } from '../../models/question-status.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionHistorySquareComponent } from '../question-history-square/question-history-square.component';

@Component({
  selector: 'app-quiz-run-end',
  templateUrl: './quiz-run-end.component.html',
  standalone: true,
  imports: [
    QuestionHistorySquareComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
})
export class QuizRunEndComponent implements OnInit, OnDestroy {
  questionStatuses: QuestionStatus[] = [];

  correctAnswerCount = 0;
  wrongAnswerCount = 0;
  skippedAnswerCount = 0;
  totalAnwerCount = 0;

  constructor(
    private quizRunService: QuizRunService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.questionStatuses = this.quizRunService.getQuestionStatuses();

    this.correctAnswerCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Correct
    ).length;
    this.wrongAnswerCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Wrong
    ).length;
    this.skippedAnswerCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Skipped
    ).length;
    this.totalAnwerCount = this.questionStatuses.length;
  }

  ngOnDestroy(): void {
    this.quizRunService.stopQuizRun();
  }

  onGoHome() {
    this.router.navigate(['quizzes']);
  }

  onRestartQuiz() {
    this.router.navigate(['..', 'start'], { relativeTo: this.route });
  }
}
