import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizQuestion } from '../../question/models/question.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizListChanged = new Subject<void>();

  private readonly quizzes: Quiz[] = [
    new Quiz(
      'Egyptian Gods',
      [
        new QuizQuestion(
          'What is the name of the egyptian god of wisdom and the moon?',
          'Anubis',
          'Thoth',
          'Ramses',
          'Zeus'
        ),
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
    return [...this.quizzes];
  }

  getQuizById(index: number) {
    return this.quizzes[index];
  }

  addEmptyQuiz() {
    this.quizzes.push(new Quiz('No Title', []));
    this.quizListChanged.next();
  }

  deleteQuiz(index: number) {
    this.quizzes.splice(index, 1);
    this.quizListChanged.next();
  }
}
