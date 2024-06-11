import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCardComponent } from '../../../question/components/question-card/question-card.component';
import { QuestionService } from '../../../question/services/question.service';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizDeletionDialogComponent } from '../dialogs/quiz-deletion-dialog/quiz-deletion-dialog.component';
import {
  QuizEditnameDialogComponent as QuizEditNameDialogComponent,
  QuizEditnameDialogComponent,
} from '../dialogs/quiz-editname-dialog/quiz-editname-dialog.component';
import { QuizQuestion } from '../../../question/models/question.model';

@Component({
  standalone: true,
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  imports: [
    MatIconModule,
    QuestionCardComponent,
    CommonModule,
    QuizDeletionDialogComponent,
    QuizEditnameDialogComponent,
  ],
})
export class QuizEditComponent implements OnInit {
  @ViewChild('editNameDialog', { static: false })
  editNameDialog!: QuizEditNameDialogComponent;

  quiz!: Quiz;
  questions: QuizQuestion[] = [];

  showEditDialog = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quiz = this.route.snapshot.data['quiz'];
    this.questions = this.route.snapshot.data['questions'];

    this.questionService.questionListChanged.subscribe(() => {
      this.questions = this.questionService.getQuestions();
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
    this.quizService.updateQuizName(this.quiz, newQuizName).subscribe(() => {
      this.quiz.name = newQuizName;
    });
    this.showEditDialog = false;
  }

  onAddEmptyQuizQuestion() {
    this.questionService.createQuestion(this.quiz.id);
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }
}
