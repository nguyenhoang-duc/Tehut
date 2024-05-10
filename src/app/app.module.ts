import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quiz/components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './quiz/components/quiz-card/quiz-card.component';

import { MatIconModule } from '@angular/material/icon';
import { QuizDeletionDialogComponent } from './quiz/components/quiz-deletion-dialog/quiz-deletion-dialog.component';

@NgModule({
  declarations: [AppComponent, QuizListComponent, QuizCardComponent, QuizDeletionDialogComponent],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
