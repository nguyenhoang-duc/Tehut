import { Route } from '@angular/router';
import { canActivateQuestion } from './services/question.guard';

export const QUESTION_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/question-edit/question-edit.component').then(
        (m) => m.QuestionEditComponent
      ),
    canActivate: [canActivateQuestion],
  },
];
