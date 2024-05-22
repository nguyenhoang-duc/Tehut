import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  imports: [QuizCardComponent, MatIconModule],
})
export class QuizOverviewComponent implements OnInit, OnDestroy {
  quizzes: Quiz[] = [];

  private quizListChangedSubscription: Subscription | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();

    this.quizListChangedSubscription = this.quizService.quizListChanged.subscribe(() => {
      this.quizzes = this.quizService.getQuizzes();
    });
  }

  ngOnDestroy(): void {
    this.quizListChangedSubscription?.unsubscribe();
  }

  onAddEmptyQuiz() {
    this.quizService.addEmptyQuiz();
  }
}
