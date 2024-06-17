import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { QuestionService } from './question.service';

export const canActivateQuestion: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const questionService = inject(QuestionService);
  const router = inject(Router);

  if (questionService.getQuestionById(route.params['questionid'])) {
    return true;
  }

  return router.createUrlTree(['not-found']);
};
