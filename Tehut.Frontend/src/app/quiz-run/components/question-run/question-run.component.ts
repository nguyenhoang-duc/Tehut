import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionRunAnswerComponent } from '../question-run-answer/question-run-answer.component';
import { QuizRunService } from '../../services/quiz-run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-question-run',
  templateUrl: './question-run.component.html',
  standalone: true,
  imports: [QuestionRunAnswerComponent, MatIconModule],
})
export class QuestionRunComponent implements OnInit {
  @Input()
  currentQuestionIndex = 0;

  question: QuizQuestion | undefined;

  answersRevealed = false;
  selectedAnswer: number = 0;

  constructor(
    private quizRunService: QuizRunService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => {
      this.updateQuestion(+q['current'] - 1);
    });
  }

  onAnswerClicked(index: number) {
    this.answersRevealed = true;
    this.selectedAnswer = index;

    this.quizRunService.setAnswer(
      this.currentQuestionIndex,
      this.selectedAnswer
    );
  }

  onNextQuestion() {
    this.quizRunService.navigateToNextQuestion(this.route);
  }

  updateQuestion(questionIndex: number) {
    this.question = this.quizRunService.getQuestion(questionIndex);

    const selectedAnswer = this.quizRunService.getSelectedAnswer(questionIndex);

    if (selectedAnswer !== null) {
      this.answersRevealed = true;
      this.selectedAnswer = selectedAnswer;
    } else {
      this.answersRevealed = false;
      this.selectedAnswer = 0;
    }
  }
}
