import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { HeaderIconButtonComponent } from '../../../shared/components/header-icon-button.component';
import { SearchBarComponent } from '../../../shared/components/search-bar.component';
import { Quiz } from '../../models/quiz.model';
import { FilterQuizPipe } from '../../services/filter-quiz.pipe';
import { QuizService } from '../../services/quiz.service';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';

@Component({
    selector: 'app-quiz-overview',
    templateUrl: './quiz-overview.component.html',
    imports: [
        QuizCardComponent,
        MatIconModule,
        HeaderIconButtonComponent,
        SearchBarComponent,
        FilterQuizPipe,
    ]
})
export class QuizOverviewComponent implements OnInit, OnDestroy {
  quizzes: Quiz[] = [];
  searchText = '';

  private quizListChangedSubscription: Subscription | undefined;
  private quizNameChangedSubscription: Subscription | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();

    this.quizListChangedSubscription =
      this.quizService.quizListChanged.subscribe(() => {
        this.quizzes = this.quizService.getQuizzes();
      });

    this.quizNameChangedSubscription =
      this.quizService.quizNameChanged.subscribe((updatedQuiz: Quiz) => {
        const index = this.quizzes.findIndex((q) => q.id === updatedQuiz.id);

        if (index >= 0) {
          this.quizzes[index].name = updatedQuiz.name;
        }
      });
  }

  ngOnDestroy(): void {
    this.quizListChangedSubscription?.unsubscribe();
    this.quizNameChangedSubscription?.unsubscribe();
  }

  onAddEmptyQuiz() {
    this.quizService.createQuiz();
  }

  onSearchQuiz(searchText: string) {
    this.searchText = searchText;
  }
}
