import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionRunAnswerComponent } from '../question-run-answer/question-run-answer.component';

@Component({
  selector: 'app-question-run',
  templateUrl: './question-run.component.html',
  standalone: true,
  imports: [QuestionRunAnswerComponent],
})
export class QuestionRunComponent implements OnInit {
  @Input()
  question!: QuizQuestion;

  answersRevealed = false;
  selectedAnswer: number = 0;

  ngOnInit(): void {}

  onAnswerClicked(index: number) {
    this.answersRevealed = true;
    this.selectedAnswer = index;
  }
}
