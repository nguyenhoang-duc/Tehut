import { Injectable } from '@angular/core';
import { Quiz } from '../../quiz/models/quiz.model';
import { QuizQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  addEmptyQuizQuestion(quiz: Quiz) {
    quiz.questions.push(
      new QuizQuestion(
        'No Question',
        'Empty Answer 1',
        'Empty Answer 2',
        'Empty Answer 3',
        'Empty Answer 4'
      )
    );
  }

  deleteQuizQuestion(quiz: Quiz, index: number) {
    quiz.questions.splice(index, 1);
  }
}
