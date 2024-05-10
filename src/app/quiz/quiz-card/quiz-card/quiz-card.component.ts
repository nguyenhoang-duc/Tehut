import { Component, Input } from '@angular/core';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css',
})
export class QuizCardComponent {
  @Input()
  quiz: Quiz | undefined;

  get quizName() {
    return this.quiz?.name ?? '';
  }

  get questionCount() {
    const questionCount = this.quiz?.questions?.length ?? 0;
    return questionCount == 0
      ? 'No Questions'
      : questionCount == 1
      ? '1 Question'
      : `${questionCount} Questions`;
  }
}
