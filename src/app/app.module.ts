import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quiz/components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './quiz/components/quiz-card/quiz-card.component';

import { MatIconModule } from '@angular/material/icon';
import { QuizDeletionDialogComponent } from './quiz/components/quiz-deletion-dialog/quiz-deletion-dialog.component';
import { QuizRunComponent } from './quiz/components/quiz-run/quiz-run.component';
import { QuizEditComponent } from './quiz/components/quiz-edit/quiz-edit.component';
import { QuestionCardComponent } from './question/components/question-card/question-card.component';
import { QuizEditnameDialogComponent } from './quiz/components/quiz-editname-dialog/quiz-editname-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizCardComponent,
    QuizDeletionDialogComponent,
    QuizRunComponent,
    QuizEditComponent,
    QuestionCardComponent,
    QuizEditnameDialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
