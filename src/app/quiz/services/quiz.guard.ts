import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { QuizService } from './quiz.service';
import { inject } from '@angular/core';

export const canActivateQuizFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const quizService = inject(QuizService);
  const router = inject(Router);

  if (quizService.getQuizById(route.params['id'])) {
    return true;
  }

  return router.createUrlTree(['not-found']);
};
