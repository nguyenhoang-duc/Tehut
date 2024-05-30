import { Route } from '@angular/router';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';
import { resolveQuizzesFn } from './services/quizzes-resolver.service.';
import { resolveQuizFn } from './services/quiz-resolver.service';
import { resolveQuestionsFn } from '../question/services/questions-resolver.service';

export const QUIZ_ROUTES: Route[] = [
  {
    path: '',
    component: QuizOverviewComponent,
    resolve: { quizzes: resolveQuizzesFn },
  },
  {
    path: ':id',
    redirectTo: ':id/questions',
  },
  {
    path: ':id/run',
    loadComponent: () =>
      import('./components/quiz-run/quiz-run.component').then(
        (m) => m.QuizRunComponent
      ),
  },
  {
    path: ':id/questions',
    loadComponent: () =>
      import('./components/quiz-edit/quiz-edit.component').then(
        (m) => m.QuizEditComponent
      ),
    resolve: { quiz: resolveQuizFn, questions: resolveQuestionsFn },
  },
];
