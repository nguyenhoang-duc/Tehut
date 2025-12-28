import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizRunService } from '../../services/quiz-run.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuizRunTime } from '../../models/quiz-run-time.model';

@Component({
    selector: 'app-quiz-run-clock',
    imports: [CommonModule],
    templateUrl: './quiz-run-clock.component.html'
})
export class QuizRunClockComponent implements OnInit, OnDestroy {
  timer$: Observable<QuizRunTime> | undefined;

  quizRunStarted: Subscription | undefined;
  quizRunStopped: Subscription | undefined;

  constructor(private quizRunService: QuizRunService) {}

  ngOnInit(): void {
    this.timer$ = this.quizRunService.getTimer();

    this.quizRunStarted = this.quizRunService.quizRunStarted.subscribe(() => {
      this.timer$ = this.quizRunService.getTimer();
    });
    this.quizRunStopped = this.quizRunService.quizRunStopped.subscribe(() => {
      this.timer$ = this.quizRunService.getTimer();
    });
  }

  ngOnDestroy(): void {
    this.quizRunStarted?.unsubscribe();
    this.quizRunStopped?.unsubscribe();
  }
}
