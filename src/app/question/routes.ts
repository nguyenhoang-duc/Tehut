import { Route } from '@angular/router';
import { resolveQuestionFn } from './services/question-resolver.service';

export const QUESTION_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/question-edit/question-edit.component').then(
        (m) => m.QuestionEditComponent
      ),
    resolve: { question: resolveQuestionFn },
  },
];
