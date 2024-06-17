import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionRunAnswerComponent } from '../question-run-answer/question-run-answer.component';
import { QuizRunService } from '../../services/quiz-run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { KeyInteractionService } from '../../../shared/services/key-interaction.service';

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
  quizRunFinished = false;

  private currentQuestionSubscription: Subscription | undefined;
  private answerChangedSubscription: Subscription | undefined;

  constructor(
    private quizRunService: QuizRunService,
    private router: Router,
    private route: ActivatedRoute,
    private keyIntersectionService: KeyInteractionService
  ) {
    keyIntersectionService.keyUp.subscribe((key: string) => {
      this.onKeyPressed(key);
    });
  }

  ngOnInit(): void {
    this.currentQuestionSubscription = this.route.queryParams.subscribe((q) => {
      this.updateView(+q['current'] - 1);
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

  onKeyPressed(key: string) {
    if (!this.answersRevealed) {
      if (key === '1' || key === '2' || key === '3' || key === '4') {
        this.quizRunService.setAnswer(this.currentQuestionIndex, +key);
      }
    } else {
      if (key === 'Tab') {
        this.quizRunService.navigateToNextQuestion();
      }
    }
  }

  onNextQuestion() {
    this.quizRunService.navigateToNextQuestion();
  }

  updateView(questionIndex: number) {
    this.quizRunFinished = this.quizRunService.isQuizRunFinished();
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
    this.quizRunFinished = this.quizRunService.isQuizRunFinished();
  }
}
