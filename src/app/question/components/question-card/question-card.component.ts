import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { Quiz } from '../../../quiz/models/quiz.model';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  imports: [MatIconModule],
})
export class QuestionCardComponent implements OnInit {
  @Input()
  quiz!: Quiz;

  @Input()
  quizQuestion!: QuizQuestion;

  @Input()
  questionIndex: number = -1;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onEdit() {
    this.router.navigate([this.questionIndex], { relativeTo: this.route });
  }

  onDelete() {
    this.questionService.deleteQuizQuestion(this.quiz, this.questionIndex);
  }
}
