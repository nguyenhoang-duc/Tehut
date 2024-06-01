import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { QuizRunService } from './quiz-run.service';
import { QuizRunSession } from '../models/quiz-run-session.model';

export const canActivateQuizRun: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const quizRunService = inject(QuizRunService);

  const quizId = route.params['id'];

  const startUrl = router.createUrlTree(['quizzes', quizId, 'run', 'start']);

  if (!localStorage.getItem('quizRunSession')) {
    return startUrl;
  }

  const sessionData: QuizRunSession = JSON.parse(
    localStorage.getItem('quizRunSession')!
  );

  if (sessionData.quiz.id !== route.params['id']) {
    return startUrl;
  }

  if (!route.queryParams['current']) {
    const nextQuestionIndex = quizRunService.getNextQuestionIndex() ?? 0;

    return router.createUrlTree(['quizzes', quizId, 'run'], {
      queryParamsHandling: 'merge',
      queryParams: { current: nextQuestionIndex + 1 },
    });
  }

  return true;
};
