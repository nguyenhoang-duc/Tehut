import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizListChanged = new Subject<void>();

  getQuizzes(): Quiz[] {
    const quizIds: string[] = localStorage.getItem('quizzes')?.split(',') ?? [];

    if (quizIds.length === 0) {
      return [];
    }

    const quizzes = quizIds
      .map((id) => this.getQuizById(id))
      .filter((quiz) => quiz?.id !== undefined) as Quiz[];

    return quizzes;
  }

  getQuizById(quizId: string): Quiz | undefined {
    const quizString = localStorage.getItem(`quizzes/${quizId}`) ?? '';

    try {
      const quiz = JSON.parse(quizString) as Quiz;
      return quiz;
    } catch {
      return undefined;
    }
  }

  createQuiz() {
    const newQuiz = new Quiz('No Title', '');
    newQuiz.id = crypto.randomUUID();

    const quizIds = localStorage.getItem('quizzes')?.split(',') ?? [];
    quizIds.push(newQuiz.id);

    localStorage.setItem('quizzes', quizIds.join(','));
    localStorage.setItem(`quizzes/${newQuiz.id}`, JSON.stringify(newQuiz));

    this.quizListChanged.next();
  }

  updateQuizName(quiz: Quiz, newName: string) {
    const updatedQuiz = Object.assign({}, quiz);
    updatedQuiz.name = newName;

    localStorage.setItem(`quizzes/${quiz.id}`, JSON.stringify(updatedQuiz));
  }

  updateQuizImageUrl(quiz: Quiz, newImageUrl: string) {
    const updatedQuiz = Object.assign({}, quiz);
    updatedQuiz.imagePath = newImageUrl;

    localStorage.setItem(`quizzes/${quiz.id}`, JSON.stringify(updatedQuiz));
  }

  deleteQuiz(quizId: string) {
    localStorage.removeItem(`quizzes/${quizId}`);

    const quizIds: string[] = localStorage.getItem('quizzes')?.split(',') ?? [];
    const quizIndex = quizIds.indexOf(quizId);

    if (quizIndex >= 0) {
      quizIds.splice(quizIndex, 1);
      localStorage.setItem('quizzes', quizIds.join(','));
      this.quizListChanged.next();
    }
  }

  updateQuestionCount(quizId: string) {
    const quiz = this.getQuizById(quizId);

    if (quiz) {
      const questionIds =
        localStorage.getItem(`quizzes/${quiz.id}/questions`) ?? '';

      quiz.questionCount = questionIds ? questionIds.split(',').length : 0;

      localStorage.setItem(`quizzes/${quiz.id}`, JSON.stringify(quiz));
    }
  }
}
