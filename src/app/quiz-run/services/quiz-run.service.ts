import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from '../../quiz/models/quiz.model';
import { QuestionStatus } from '../models/question-status.model';
import { QuizRunSession } from '../models/quiz-run-session.model';

@Injectable({ providedIn: 'root' })
export class QuizRunService {
  answerChanged = new Subject<{
    questionIndex: number;
    selectedAnswer: number;
  }>();

  constructor(private router: Router) {}

  startQuizRun(quiz: Quiz, questions: QuizQuestion[]) {
    if (localStorage.getItem('quizRunSession') !== null) {
      this.stopQuizRun();
    }

    const quizRunSession = new QuizRunSession(quiz, questions, new Date());
    this.saveQuizRunSession(quizRunSession);
  }

  stopQuizRun() {
    localStorage.removeItem('quizRunSession');
  }

  private getQuizRunSession(): QuizRunSession | undefined {
    if (localStorage.getItem('quizRunSession') === null) {
      return undefined;
    } else {
      return JSON.parse(localStorage.getItem('quizRunSession')!);
    }
  }

  saveQuizRunSession(quizRunSession: QuizRunSession) {
    if (quizRunSession) {
      localStorage.setItem('quizRunSession', JSON.stringify(quizRunSession));
    }
  }

  setAnswer(questionIndex: number, answer: number) {
    let quizRunSession = this.getQuizRunSession();

    if (!quizRunSession) {
      return;
    }

    quizRunSession.selectedAnswers[questionIndex] = answer;

    this.saveQuizRunSession(quizRunSession);

    this.answerChanged.next({
      questionIndex: questionIndex,
      selectedAnswer: answer,
    });
  }

  isQuizRunFinished() {
    return (
      this.getQuizRunSession()?.selectedAnswers.every((a) => a > 0) ?? false
    );
  }

  getQuestion(questionIndex: number) {
    return this.getQuizRunSession()?.questions[questionIndex];
  }

  getQuestionCount() {
    return this.getQuizRunSession()?.questions.length ?? 0;
  }

  getSelectedAnswer(questionIndex: number) {
    return this.getQuizRunSession()?.selectedAnswers[questionIndex] ?? null;
  }

  getQuiz() {
    return this.getQuizRunSession()?.quiz;
  }

  getNextQuestionIndex() {
    return this.getQuizRunSession()?.selectedAnswers.findIndex((s) => s === -1);
  }

  navigateToNextQuestion() {
    if (this.isQuizRunFinished()) {
      this.router.navigate([
        'quizzes',
        this.getQuizRunSession()?.quiz.id,
        'run',
        'end',
      ]);
      return;
    }

    const nextQuestionIndex = this.getNextQuestionIndex() ?? 0;

    this.router.navigate(
      ['quizzes', this.getQuizRunSession()?.quiz.id, 'run'],
      {
        queryParams: {
          current: nextQuestionIndex + 1,
        },
      }
    );
  }

  getQuestionStatuses() {
    const quizRunSession = this.getQuizRunSession();

    if (!quizRunSession) {
      return [];
    }

    return quizRunSession.selectedAnswers.map((answer, index) => {
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
