import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionService } from '../../../question/services/question.service';
import { QuizEditnameDialogComponent as QuizEditNameDialogComponent } from '../quiz-editname-dialog/quiz-editname-dialog.component';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.css',
})
export class QuizEditComponent implements OnInit {
  @ViewChild('editNameDialog', { static: false })
  editNameDialog!: QuizEditNameDialogComponent;

  quizIndex!: number;
  quiz!: Quiz;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {
    this.quizIndex = route.snapshot.params['id'];
    this.quiz = quizService.getQuizById(this.quizIndex);
  }

  ngOnInit(): void {}

  onRunQuiz() {
    this.router.navigate(['..', 'run'], { relativeTo: this.route });
  }

  onEditNameQuiz() {
    this.editNameDialog.openDialog(this.quiz.name);
  }

  onEditNameConfirmed(newQuizName: string) {
    this.quiz.name = newQuizName;
  }

  onAddEmptyQuizQuestion() {
    this.questionService.addEmptyQuizQuestion(this.quiz);
  }
}
