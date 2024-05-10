import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz/components/quiz-list/quiz-list.component';
import { QuizRunComponent } from './quiz/components/quiz-run/quiz-run.component';
import { QuizEditComponent } from './quiz/components/quiz-edit/quiz-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  {
    path: 'quizzes',
    component: QuizListComponent,
  },
  {
    path: 'quizzes/:id',
    redirectTo: 'quizzes/:id/edit',
  },
  {
    path: 'quizzes/:id/run',
    component: QuizRunComponent,
  },
  {
    path: 'quizzes/:id/edit',
    component: QuizEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
