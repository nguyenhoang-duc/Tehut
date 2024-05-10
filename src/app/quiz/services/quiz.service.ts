import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizQuestion } from '../../question/models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly quizzes: Quiz[] = [
    new Quiz(
      'Egyptian Gods',
      [
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
        new QuizQuestion('', '', '', '', ''),
      ],
      'https://www.worldhistory.org/img/r/p/500x600/5404.jpg?v=1636033502'
    ),
    new Quiz('Football', [new QuizQuestion('', '', '', '', '')]),
    new Quiz('Airlines', []),
  ];

  getQuizzes() {
    return this.quizzes;
  }
}
