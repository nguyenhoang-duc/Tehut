import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { QuestionRunAnswerComponent } from '../question-run-answer/question-run-answer.component';

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
  private keyUpSubscription: Subscription | undefined;
  private keyDownSubscription: Subscription | undefined;

  constructor(
    private quizRunService: QuizRunService,
    private route: ActivatedRoute
  ) {}

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
    this.keyDownSubscription?.unsubscribe();
    this.keyUpSubscription?.unsubscribe();
  }

  onAnswerClicked(index: number) {
    this.quizRunService.setAnswer(this.currentQuestionIndex, index);
  }

  @HostListener('body:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.quizRunService.navigateToNextQuestion();
    }

    if (!this.answersRevealed) {
      if (
        event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4'
      ) {
        this.quizRunService.setAnswer(this.currentQuestionIndex, +event.key);
      }
    }
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
