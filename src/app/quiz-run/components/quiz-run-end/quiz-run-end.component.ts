import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionStatus } from '../../models/question-status.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionHistorySquareComponent } from '../question-history-square/question-history-square.component';
import { QuizRunTime } from '../../models/quiz-run-time.model';

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
export class QuizRunEndComponent implements OnInit {
  questionStatuses: QuestionStatus[] = [];

  correctCount = 0;
  wrongCount = 0;
  skippedCount = 0;

  correctPercentage = 0;
  wrongPercentage = 0;
  skippedPercentage = 0;

  quizRunTime: string = '';
  secondsPerQuestion = 0;

  constructor(
    private quizRunService: QuizRunService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.questionStatuses = this.quizRunService.getQuestionStatuses();

    this.correctCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Correct
    ).length;
    this.wrongCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Wrong
    ).length;
    this.skippedCount = this.questionStatuses.filter(
      (v) => v === QuestionStatus.Skipped
    ).length;

    const totalAmount = this.questionStatuses.length;

    this.correctPercentage =
      Math.round((this.correctCount / totalAmount) * 10000.0) / 100;
    this.wrongPercentage =
      Math.round((this.wrongCount / totalAmount) * 10000.0) / 100;
    this.skippedPercentage =
      Math.round((this.skippedCount / totalAmount) * 10000.0) / 100;

    this.quizRunTime = this.quizRunService.getElaspedTime()?.toString() ?? '';

    const totalSeconds =
      this.quizRunService.getElaspedTime()?.getSeconds() ?? 0;

    this.secondsPerQuestion =
      Math.round((totalSeconds / totalAmount) * 10.0) / 10.0;
  }

  onGoHome() {
    this.router.navigate(['quizzes']);
  }

  onRestartQuiz() {
    this.router.navigate(['..', 'start'], { relativeTo: this.route });
  }
}
