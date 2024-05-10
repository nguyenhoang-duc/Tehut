import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { QuizQuestion } from '../../../question/models/question.model';
import { QuestionService } from '../../../question/services/question.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.css',
})
export class QuizEditComponent implements OnInit {
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

  onAddEmptyQuizQuestion() {
    this.questionService.addEmptyQuizQuestion(this.quiz);
  }
}
