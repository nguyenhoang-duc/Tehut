import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  {
    path: 'quizzes/:id/questions/:questionid',
    loadChildren: () =>
      import('./question/routes').then((m) => m.QUESTION_ROUTES),
  },
  {
    path: 'quizzes/:id/run',
    loadChildren: () =>
      import('./quiz-run/routes').then((m) => m.QUIZ_RUN_ROUTES),
  },
  {
    path: 'quizzes',
    loadChildren: () => import('./quiz/routes').then((m) => m.QUIZ_ROUTES),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
