import { Route } from '@angular/router';
import { canActivateQuizRun } from './services/quiz-run.guard';

export const QUIZ_RUN_ROUTES: Route[] = [
  {
    path: 'start',
    loadComponent: () =>
      import('./components/quiz-run-start/quiz-run-start.component').then(
        (m) => m.QuizRunStartComponent
      ),
  },
  {
    path: 'end',
    loadComponent: () =>
      import('./components/quiz-run-end/quiz-run-end.component').then(
        (m) => m.QuizRunEndComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/quiz-run/quiz-run.component').then(
        (m) => m.QuizRunComponent
      ),
    canActivate: [canActivateQuizRun],
  },
];
