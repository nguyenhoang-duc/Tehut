import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css',
})
export class QuizListComponent implements OnInit, OnDestroy {
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
