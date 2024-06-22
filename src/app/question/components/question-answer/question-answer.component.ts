import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class QuestionAnswerComponent {
  @Input()
  form!: FormGroup;

  @Input()
  index = 0;
}
