import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { Quiz } from '../../../quiz/models/quiz.model';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  standalone: true,
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  imports: [MatIconModule, CommonModule, TruncatePipe],
})
export class QuestionCardComponent implements OnInit {
  @Input()
  quizQuestion!: QuizQuestion;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onEdit() {
    this.router.navigate([this.quizQuestion.id], { relativeTo: this.route });
  }

  onDelete() {}
}
