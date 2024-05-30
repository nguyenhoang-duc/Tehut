import { Route } from '@angular/router';
import { resolveQuestionFn } from './services/question-resolver.service';

export const QUESTION_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/question-view/question-view.component').then(
        (m) => m.QuestionViewComponent
      ),
    resolve: { question: resolveQuestionFn },
  },
];
