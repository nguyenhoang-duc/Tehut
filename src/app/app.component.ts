import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InitQuizService } from './quiz/services/init-quiz.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [HeaderComponent, FooterComponent, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'Tehut';

  constructor(private initQuizService: InitQuizService) {}

  ngOnInit(): void {
    if (this.initQuizService.isFirstTime()) {
      this.initQuizService.createFirstTimeQuizzes();
    }
  }
}
