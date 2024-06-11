import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { QuestionService } from '../../question/services/question.service';
import { QuizService } from './quiz.service';
import { Quiz } from '../models/quiz.model';

export const resolveQuizFn: ResolveFn<Quiz | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const quizId = route.params['id'];

  const quizService = inject(QuizService);

  return quizService.getQuizById(quizId);
};
