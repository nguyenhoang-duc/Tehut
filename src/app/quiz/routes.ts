import { Route } from '@angular/router';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';
import { canActivateQuizFn as canActivateQuiz } from './services/quiz.guard';

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
    path: ':id/questions',
    loadComponent: () =>
      import('./components/quiz-edit/quiz-edit.component').then(
        (m) => m.QuizEditComponent
      ),
    canActivate: [canActivateQuiz],
  },
];
