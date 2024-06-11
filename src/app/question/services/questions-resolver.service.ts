import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { QuizQuestion } from '../models/question.model';
import { QuestionService } from './question.service';

export const resolveQuestionsFn: ResolveFn<QuizQuestion[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const quizId = route.params['id'];

  const questionService = inject(QuestionService);

  return questionService.getQuestions(quizId);
};
