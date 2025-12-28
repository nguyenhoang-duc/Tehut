
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CardIconButtonComponent } from '../../../shared/components/card-icon-button.component';
import { QuizQuestion } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  imports: [MatIconModule, CardIconButtonComponent],
})
export class QuestionCardComponent implements OnInit {
  @Input()
  quizQuestion!: QuizQuestion;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {}

  onEdit() {
    this.router.navigate([this.quizQuestion.id], { relativeTo: this.route });
  }

  onDelete() {
    this.questionService.deleteQuizQuestion(this.quizQuestion);
  }
}
