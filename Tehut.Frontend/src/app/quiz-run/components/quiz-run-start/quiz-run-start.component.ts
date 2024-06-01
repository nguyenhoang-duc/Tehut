import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunSession } from '../../models/quiz-run-session.model';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuizRunService } from '../../services/quiz-run.service';

@Component({
  standalone: true,
  selector: 'app-quiz-run-start',
  templateUrl: './quiz-run-start.component.html',
  imports: [MatIconModule],
})
export class QuizRunStartComponent implements OnInit {
  quiz!: Quiz;
  questions: QuizQuestion[] = [];

  showLeaveQuizRunWarning = false;
  leaveQuizWarning = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizRunService: QuizRunService
  ) {}

  ngOnInit(): void {
    this.quiz = this.route.snapshot.data['quiz'];
    this.questions = this.route.snapshot.data['questions'];

    const potentialRunningQuiz = this.quizRunService.getQuiz();

    if (potentialRunningQuiz && potentialRunningQuiz.id !== this.quiz.id) {
      this.showLeaveQuizRunWarning = true;
      this.leaveQuizWarning = `Starting the quiz will cancel the current run for "${potentialRunningQuiz.name}"`;
    }
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }

  onStartQuizRun() {
    this.quizRunService.startQuizRun(this.quiz, this.questions);
    this.quizRunService.navigateToNext();
  }
}
