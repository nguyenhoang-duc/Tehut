import { Injectable, OnInit } from '@angular/core';
import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from '../../quiz/models/quiz.model';
import { QuizRunSession } from '../models/quiz-run-session.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QuizRunService {
  private quizRunSession: QuizRunSession | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  startQuizRun(quiz: Quiz, questions: QuizQuestion[]) {
    if (localStorage.getItem('quizRunSession') === null) {
      this.quizRunSession = new QuizRunSession(quiz, questions, new Date());
      this.saveQuizRunSession();
    }
  }

  stopQuizRun() {
    localStorage.removeItem('quizRunSession');
    this.quizRunSession = undefined;
  }

  fetchQuizRunSession() {
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
    }
  }

  getQuestion(questionIndex: number) {
    if (!this.quizRunSession) {
      this.fetchQuizRunSession();
    }

    return this.quizRunSession?.questions[questionIndex];
  }

  getSelectedAnswer(questionIndex: number) {
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

    return this.quizRunSession?.selectedAnswers.findIndex((s) => s === null);
  }

  navigateToNextQuestion(route: ActivatedRoute) {
    const nextQuestionIndex = this.getNextQuestionIndex() ?? 0;
    this.router.navigate([], {
      relativeTo: route,
      queryParams: {
        current: nextQuestionIndex + 1,
      },
    });
  }
}
