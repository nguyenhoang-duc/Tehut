import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-run-answer',
  templateUrl: './question-run-answer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class QuestionRunAnswerComponent {
  @Input()
  index: number = 0;

  @Input()
  answer: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  correct: boolean = false;

  @Input()
  selected: boolean = false;

  @Output()
  clicked = new EventEmitter<number>();

  onClick() {
    this.clicked.emit(this.index);
  }
}
