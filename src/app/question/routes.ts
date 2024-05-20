import { Route } from '@angular/router';

export const QUESTION_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/question-view/question-view.component').then(
        (m) => m.QuestionViewComponent
      ),
  },
];
