import { Component, Input } from '@angular/core';
import { QuestionStatus } from '../../models/question-status.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-question-history-square',
    templateUrl: './question-history-square.component.html',
    imports: [MatIconModule]
})
export class QuestionHistorySquareComponent {
  @Input()
  questionStatus: QuestionStatus = QuestionStatus.NotAnswered;

  @Input()
  questionindex: number = 0;

  get isNotAnswered() {
    return this.questionStatus === QuestionStatus.NotAnswered;
  }

  get isCorrect() {
    return this.questionStatus === QuestionStatus.Correct;
  }

  get isWrong() {
    return this.questionStatus === QuestionStatus.Wrong;
  }

  get isSkipped() {
    return this.questionStatus === QuestionStatus.Skipped;
  }
}
