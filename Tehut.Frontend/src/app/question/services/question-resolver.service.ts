import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { QuizQuestion } from '../models/question.model';
import { QuestionService } from './question.service';

export const resolveQuestionFn: ResolveFn<QuizQuestion> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const questionService = inject(QuestionService);
  const questionId = route.params['questionid'];

  return questionService.fetchQuestionById(questionId);
};
