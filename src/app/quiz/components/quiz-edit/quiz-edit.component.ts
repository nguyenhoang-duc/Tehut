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

  quizIndex!: number;
  quiz!: Quiz;

  showEditDialog = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizIndex = +this.route.snapshot.params['id'];
    this.quiz = this.quizService.getQuizById(this.quizIndex);
  }

  onRunQuiz() {
    this.router.navigate(['..', 'run'], { relativeTo: this.route });
  }

  onEditNameQuiz() {
    this.showEditDialog = true;
    this.editNameDialog.openDialog(this.quiz.name);
  }

  onEditNameConfirmed(newQuizName: string) {
    this.quiz.name = newQuizName;
    this.showEditDialog = false;
  }

  onAddEmptyQuizQuestion() {
    this.questionService.addEmptyQuizQuestion(this.quiz);
  }
}
