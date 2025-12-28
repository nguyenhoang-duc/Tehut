import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCardComponent } from '../../../question/components/question-card/question-card.component';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionService } from '../../../question/services/question.service';
import { HeaderIconButtonComponent } from '../../../shared/components/header-icon-button.component';
import { SearchBarComponent } from '../../../shared/components/search-bar.component';
import { Quiz } from '../../models/quiz.model';
import { FilterQuestionPipe } from '../../services/filter-question.pipe';
import { QuizService } from '../../services/quiz.service';
import {
  QuizEditnameDialogComponent as QuizEditNameDialogComponent,
  QuizEditnameDialogComponent,
} from '../dialogs/quiz-editname-dialog/quiz-editname-dialog.component';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  imports: [
    MatIconModule,
    QuestionCardComponent,
    CommonModule,
    QuizEditnameDialogComponent,
    HeaderIconButtonComponent,
    SearchBarComponent,
    FilterQuestionPipe,
  ],
})
export class QuizEditComponent implements OnInit {
  @ViewChild('editNameDialog', { static: false })
  editNameDialog!: QuizEditNameDialogComponent;

  quiz!: Quiz;
  questions: QuizQuestion[] = [];

  showEditDialog = false;

  searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getQuizById(this.route.snapshot.params['id'])!;
    this.questions = this.questionService.getQuestions(this.quiz.id);

    this.questionService.questionListChanged.subscribe(() => {
      this.questions = this.questionService.getQuestions(this.quiz.id);
    });
  }

  onRunQuiz() {
    this.router.navigate(['..', 'run'], { relativeTo: this.route });
  }

  onEditNameQuiz() {
    this.showEditDialog = true;
    this.editNameDialog.openDialog(this.quiz.name);
  }

  onEditNameConfirmed(newQuizName: string) {
    this.quizService.updateQuizName(this.quiz.id, newQuizName);
    this.quiz.name = newQuizName;
    this.showEditDialog = false;
  }

  onAddEmptyQuizQuestion() {
    this.questionService.createQuestion(this.quiz.id);
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
  }
}
