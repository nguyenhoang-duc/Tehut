import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { QuizService } from './quiz.service';
import { Quiz } from '../models/quiz.model';

export const resolveQuizFn: ResolveFn<Quiz[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const quizService = inject(QuizService);

  return quizService.fetchQuizzes();
};
