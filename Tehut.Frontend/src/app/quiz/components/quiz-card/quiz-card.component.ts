import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizDeletionDialogComponent } from '../dialogs/quiz-deletion-dialog/quiz-deletion-dialog.component';
import { QuizEditnameDialogComponent } from '../dialogs/quiz-editname-dialog/quiz-editname-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  imports: [
    MatIconModule,
    QuizDeletionDialogComponent,
    QuizEditnameDialogComponent,
    CommonModule,
  ],
})
export class QuizCardComponent {
  @Input()
  quiz!: Quiz;

  @ViewChild('deletionDialog')
  deletionDialog!: QuizDeletionDialogComponent;

  showDeletionDialog = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  get questionCount() {
    const questionCount = this.quiz?.questionCount ?? 0;
    return questionCount == 0
      ? 'No Questions'
      : questionCount == 1
        ? '1 Question'
        : `${questionCount} Questions`;
  }

  onRun() {
    this.router.navigate([this.quiz.id, 'run'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate([this.quiz.id, 'questions'], {
      relativeTo: this.route,
    });
  }

  onDelete() {
    if (this.quiz.id == '') {
      return;
    } else if (this.quiz.questionCount > 0) {
      this.showDeletionDialog = true;
      this.deletionDialog.openDialog();
    } else {
      this.quizService.deleteQuiz(this.quiz.id);
    }
  }

  onDeletionDialogClosed(confirmed: boolean) {
    if (confirmed) {
      this.quizService.deleteQuiz(this.quiz.id);
    }

    this.showDeletionDialog = false;
  }
}
