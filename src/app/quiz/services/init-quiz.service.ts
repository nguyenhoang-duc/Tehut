import { Injectable } from '@angular/core';
import { QuizService } from './quiz.service';
import { precompiledQuizzes } from '../models/precompiled-quizzes.model';
import { QuestionService } from '../../question/services/question.service';

@Injectable({ providedIn: 'root' })
export class InitQuizService {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  isFirstTime() {
    return !localStorage.getItem('first-visit');
  }

  createFirstTimeQuizzes() {
    for (const quiz of precompiledQuizzes) {
      this.quizService.createQuizByTemplate(quiz);

      for (const question of quiz.questions) {
        this.questionService.createQuestionByTemplate(quiz.id, question);
      }
    }

    localStorage.setItem('first-visit', new Date().toString());
  }
}
