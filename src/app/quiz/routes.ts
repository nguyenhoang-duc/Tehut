import { Route } from '@angular/router';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';

export const QUIZ_ROUTES: Route[] = [
  {
    path: '',
    component: QuizOverviewComponent,
  },
  {
    path: ':id',
    redirectTo: ':id/questions',
  },
  {
    path: ':id/run',
    loadComponent: () =>
      import('./components/quiz-run/quiz-run.component').then((m) => m.QuizRunComponent),
  },
  {
    path: ':id/questions',
    loadComponent: () =>
      import('./components/quiz-edit/quiz-edit.component').then((m) => m.QuizEditComponent),
  },
];
