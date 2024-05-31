import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunSession } from '../../models/quiz-run-session.model';
import { QuizQuestion } from '../../../question/models/question.model';

@Component({
  standalone: true,
  selector: 'app-quiz-run-start',
  templateUrl: './quiz-run-start.component.html',
  imports: [MatIconModule],
})
export class QuizRunStartComponent implements OnInit {
  quiz!: Quiz;
  questions: QuizQuestion[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quiz = this.route.snapshot.data['quiz'];
    this.questions = this.route.snapshot.data['questions'];
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }

  onStartQuizRun() {
    const newQuizRunSession = new QuizRunSession(
      this.quiz,
      this.questions,
      new Date()
    );

    localStorage.setItem('quizRunSession', JSON.stringify(newQuizRunSession));

    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
