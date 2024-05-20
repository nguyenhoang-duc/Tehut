import { Route } from '@angular/router';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';

export const routes: Route[] = [
  {
    path: '',
    component: QuizOverviewComponent,
  },
  {
    path: ':id',
    redirectTo: ':id/edit',
  },
  {
    path: ':id/run',
    loadComponent: () =>
      import('./components/quiz-run/quiz-run.component').then((m) => m.QuizRunComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/quiz-edit/quiz-edit.component').then((m) => m.QuizEditComponent),
  },
];
