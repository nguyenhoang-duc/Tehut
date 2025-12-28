import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionHistorySquareComponent } from '../question-history-square/question-history-square.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionStatus } from '../../models/question-status.model';
import { MatIconModule } from '@angular/material/icon';
import { HeaderIconButtonComponent } from '../../../shared/components/header-icon-button.component';

@Component({
    selector: 'app-quiz-run-navigation',
    templateUrl: './quiz-run-navigation.component.html',
    imports: [
        QuestionHistorySquareComponent,
        CommonModule,
        RouterModule,
        MatIconModule,
        HeaderIconButtonComponent,
    ]
})
export class QuizRunNavigationComponent {
  @Input()
  questionStatuses: QuestionStatus[] = [];

  @Input()
  highlightedIndex = 0;

  @Output()
  navigateTo = new EventEmitter<number>();

  onNavigateBack() {
    this.navigateTo.emit(this.highlightedIndex - 1);
  }

  onNavigateForward() {
    this.navigateTo.emit(this.highlightedIndex + 1);
  }

  scrollToHighlight() {
    document
      .getElementById('question' + (this.highlightedIndex + 1))
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  }
}
