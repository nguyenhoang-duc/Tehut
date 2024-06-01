import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionRunAnswerComponent } from '../question-run-answer/question-run-answer.component';
import { QuizRunService } from '../../services/quiz-run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-run',
  templateUrl: './question-run.component.html',
  standalone: true,
  imports: [QuestionRunAnswerComponent, MatIconModule],
})
export class QuestionRunComponent implements OnInit, OnDestroy {
  @Input()
  currentQuestionIndex = 0;

  question: QuizQuestion | undefined;

  answersRevealed = false;
  selectedAnswer: number = 0;

  private currentQuestionSubscription: Subscription | undefined;
  private answerChangedSubscription: Subscription | undefined;

  constructor(
    private quizRunService: QuizRunService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentQuestionSubscription = this.route.queryParams.subscribe((q) => {
      this.updateQuestion(+q['current'] - 1);
    });

    this.answerChangedSubscription =
      this.quizRunService.answerChanged.subscribe((a) =>
        this.onAnswerChanged(a.questionIndex, a.selectedAnswer)
      );
  }

  ngOnDestroy(): void {
    this.currentQuestionSubscription?.unsubscribe();
    this.answerChangedSubscription?.unsubscribe();
  }

  onAnswerClicked(index: number) {
    this.quizRunService.setAnswer(this.currentQuestionIndex, index);
  }

  onNextQuestion() {
    this.quizRunService.navigateToNextQuestion();
  }

  updateQuestion(questionIndex: number) {
    this.question = this.quizRunService.getQuestion(questionIndex);

    const selectedAnswer =
      this.quizRunService.getSelectedAnswer(questionIndex) ?? -1;

    if (selectedAnswer !== -1) {
      this.answersRevealed = true;
      this.selectedAnswer = selectedAnswer;
    } else {
      this.answersRevealed = false;
      this.selectedAnswer = 0;
    }
  }

  onAnswerChanged(questionIndex: number, selectedAnswer: number) {
    if (questionIndex !== this.currentQuestionIndex) {
      return;
    }

    this.answersRevealed = true;
    this.selectedAnswer = selectedAnswer;
  }
}
