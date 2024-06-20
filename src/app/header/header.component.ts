import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  EventType,
  Router,
  RouterEvent,
  RouterModule,
} from '@angular/router';
import { QuizRunService } from '../quiz-run/services/quiz-run.service';
import { TextButtonComponent } from '../shared/components/text-button.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterModule, TextButtonComponent],
})
export class HeaderComponent implements OnInit {
  runningQuizName = '';
  showRunningQuiz = false;

  constructor(
    private quizRunService: QuizRunService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof RouterEvent && e.type === EventType.NavigationEnd) {
        this.updateHeader(e.url);
      }
    });
  }

  onNavigateToQuizRun() {
    this.quizRunService.navigateToNextQuestion();
  }

  private updateHeader(url: string) {
    if (url.indexOf('/run') !== -1) {
      this.showRunningQuiz = false;
      return;
    }

    if (
      this.quizRunService.isQuizRunning() &&
      !this.quizRunService.isQuizRunFinished()
    ) {
      this.runningQuizName = this.quizRunService.getQuiz()?.name ?? '';
      this.showRunningQuiz = true;
    }
  }
}
