import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizCardComponent } from './quiz/quiz-card/quiz-card/quiz-card.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, QuizListComponent, QuizCardComponent],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
