import { Component, Input, ViewChild } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizDeletionDialogComponent } from '../quiz-deletion-dialog/quiz-deletion-dialog.component';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css',
})
export class QuizCardComponent {
  @Input()
  quiz: Quiz | undefined;

  @Input()
  quizIndex: number = 0;

  @ViewChild('deletionDialog')
  deletionDialog!: QuizDeletionDialogComponent;

  constructor(private quizService: QuizService) {}

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

  onDelete() {
    if (this.quizIndex == -1) {
      return;
    } else if ((this.quiz?.questions?.length ?? 0) > 1) {
      this.deletionDialog.openDialog();
    } else {
      this.quizService.deleteQuiz(this.quizIndex);
    }
  }

  onDeletionDialogClosed(confirmed: boolean) {
    if (confirmed) {
      this.quizService.deleteQuiz(this.quizIndex);
    }
  }
}
