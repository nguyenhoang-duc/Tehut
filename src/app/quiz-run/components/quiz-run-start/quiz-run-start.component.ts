import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunSession } from '../../models/quiz-run-session.model';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuizRunService } from '../../services/quiz-run.service';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../quiz/services/quiz.service';
import { QuestionService } from '../../../question/services/question.service';

@Component({
  standalone: true,
  selector: 'app-quiz-run-start',
  templateUrl: './quiz-run-start.component.html',
  imports: [MatIconModule, CommonModule],
})
export class QuizRunStartComponent implements OnInit {
  quiz!: Quiz;
  questions: QuizQuestion[] = [];

  showLeaveQuizRunWarning = false;
  leaveQuizWarning = '';

  quizHasNoQuestions = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizRunService: QuizRunService,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getQuizById(this.route.snapshot.params['id'])!;
    this.questions = this.questionService.getQuestions(this.quiz.id);

    const potentialRunningQuiz = this.quizRunService.getQuiz();

    if (potentialRunningQuiz && potentialRunningQuiz.id !== this.quiz.id) {
      this.showLeaveQuizRunWarning = true;
      this.leaveQuizWarning = `Starting the quiz will cancel the current run for "${potentialRunningQuiz.name}"`;
    }

    if (this.questions.length === 0) {
      this.quizHasNoQuestions = true;
    }
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }

  onStartQuizRun() {
    this.quizRunService.startQuizRun(this.quiz, this.questions);
    this.quizRunService.navigateToNextQuestion();
  }
}
