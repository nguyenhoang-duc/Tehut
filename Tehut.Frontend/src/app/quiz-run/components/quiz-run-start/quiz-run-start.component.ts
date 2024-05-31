import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../quiz/models/quiz.model';
import { QuizRunSession } from '../../models/quiz-run-session.model';

@Component({
  standalone: true,
  selector: 'app-quiz-run-start',
  templateUrl: './quiz-run-start.component.html',
  imports: [MatIconModule],
})
export class QuizRunStartComponent implements OnInit {
  quiz!: Quiz;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quiz = this.route.snapshot.data['quiz'];
  }

  onNavigateBack() {
    this.router.navigate(['/quizzes']);
  }

  onStartQuizRun() {
    const newQuizRunSession = new QuizRunSession(new Date());

    localStorage.setItem('quizRunSession', JSON.stringify(newQuizRunSession));
  }
}
