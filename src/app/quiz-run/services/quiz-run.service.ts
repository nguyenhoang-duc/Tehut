import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from '../../quiz/models/quiz.model';
import { QuizRunSession } from '../models/quiz-run-session.model';
import { QuestionStatus } from '../models/question-status.model';

@Injectable({ providedIn: 'root' })
export class QuizRunService {
  private quizRunSession: QuizRunSession | undefined;

  answerChanged = new Subject<{
    questionIndex: number;
    selectedAnswer: number;
  }>();

  constructor(private router: Router) {}

  startQuizRun(quiz: Quiz, questions: QuizQuestion[]) {
    if (localStorage.getItem('quizRunSession') !== null) {
      this.stopQuizRun();
    }

    this.quizRunSession = new QuizRunSession(quiz, questions, new Date());
    this.saveQuizRunSession();
  }

  stopQuizRun() {
    localStorage.removeItem('quizRunSession');
    this.quizRunSession = undefined;
  }

  private fetchQuizRunSession() {
    if (localStorage.getItem('quizRunSession') === null) {
      this.quizRunSession = undefined;
    } else {
      this.quizRunSession = JSON.parse(localStorage.getItem('quizRunSession')!);
    }
  }

  saveQuizRunSession() {
    if (this.quizRunSession) {
      localStorage.setItem(
        'quizRunSession',
        JSON.stringify(this.quizRunSession)
      );
    }
  }

  setAnswer(questionIndex: number, answer: number) {
    if (this.quizRunSession) {
      this.quizRunSession.selectedAnswers[questionIndex] = answer;
      this.saveQuizRunSession();

      this.answerChanged.next({
        questionIndex: questionIndex,
        selectedAnswer: answer,
      });
    }
  }

  isQuizRunFinished() {
    if (this.quizRunSession === undefined) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.selectedAnswers.every((a) => a >= 0) ?? false;
  }

  getQuestion(questionIndex: number) {
    if (!this.quizRunSession) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.questions[questionIndex];
  }

  getSelectedAnswer(questionIndex: number) {
    if (!this.quizRunSession) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.selectedAnswers[questionIndex] ?? null;
  }

  getQuiz() {
    if (!this.quizRunSession) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.quiz;
  }

  getNextQuestionIndex() {
    if (!this.quizRunSession) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.selectedAnswers.findIndex((s) => s === -1);
  }

  navigateToNextQuestion() {
    if (this.isQuizRunFinished()) {
      this.router.navigate([
        'quizzes',
        this.quizRunSession?.quiz.id,
        'run',
        'end',
      ]);
      return;
    }

    const nextQuestionIndex = this.getNextQuestionIndex() ?? 0;

    this.router.navigate(['quizzes', this.quizRunSession?.quiz.id, 'run'], {
      queryParams: {
        current: nextQuestionIndex + 1,
      },
    });
  }

  getQuestionStatuses() {
    if (this.quizRunSession === undefined) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession!.selectedAnswers.map((answer, index) => {
      if (answer === -1) {
        return QuestionStatus.NotAnswered;
      } else if (answer === 0) {
        return QuestionStatus.Skipped;
      } else if (answer === this.getQuestion(index)?.correctAnswerIndex) {
        return QuestionStatus.Correct;
      } else {
        return QuestionStatus.Wrong;
      }
    });
  }
}
