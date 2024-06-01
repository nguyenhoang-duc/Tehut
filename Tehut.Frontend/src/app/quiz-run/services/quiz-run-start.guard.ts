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

  if (!localStorage.getItem('quizRunSession')) {
    return router.createUrlTree([state.url + '/start']);
  } else {
    const sessionData: QuizRunSession = JSON.parse(
      localStorage.getItem('quizRunSession')!
    );
    if (sessionData.quiz.id !== route.params['id']) {
      return router.createUrlTree([state.url + '/start']);
    }
  }

  if (!route.queryParams['current']) {
    const nextQuestionIndex = quizRunService.getNextQuestionIndex() ?? 0;

    return router.createUrlTree(
      ['quizzes', quizRunService.getQuiz()?.id, 'run'],
      {
        queryParamsHandling: 'merge',
        queryParams: { current: nextQuestionIndex + 1 },
      }
    );
  }

  return true;
};
