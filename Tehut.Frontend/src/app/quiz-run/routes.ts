import { Route } from '@angular/router';
import { resolveQuizFn } from '../quiz/services/quiz-resolver.service';
import { canActivateQuizRun } from './services/quiz-run.guard';
import { resolveQuestionsFn } from '../question/services/questions-resolver.service';

export const QUIZ_RUN_ROUTES: Route[] = [
  {
    path: 'start',
    loadComponent: () =>
      import('./components/quiz-run-start/quiz-run-start.component').then(
        (m) => m.QuizRunStartComponent
      ),
    resolve: { quiz: resolveQuizFn, questions: resolveQuestionsFn },
  },
  {
    path: 'end',
    loadComponent: () =>
      import('./components/quiz-run-end/quiz-run-end.component').then(
        (m) => m.QuizRunEndComponent
      ),
    resolve: { quiz: resolveQuizFn, questions: resolveQuestionsFn },
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
