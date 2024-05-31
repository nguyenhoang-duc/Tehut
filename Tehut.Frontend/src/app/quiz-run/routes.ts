import { Route } from '@angular/router';
import { resolveQuizFn } from '../quiz/services/quiz-resolver.service';

export const QUIZ_RUN_ROUTES: Route[] = [
  {
    path: 'start',
    loadComponent: () =>
      import('./components/quiz-run-start/quiz-run-start.component').then(
        (m) => m.QuizRunStartComponent
      ),
    resolve: { quiz: resolveQuizFn },
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/quiz-run/quiz-run.component').then(
        (m) => m.QuizRunComponent
      ),
  },
];
