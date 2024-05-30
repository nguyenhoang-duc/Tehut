import { Injectable } from '@angular/core';
import { Quiz } from '../../quiz/models/quiz.model';
import { QuizQuestion } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EMPTY, Observable, Subject, map, tap } from 'rxjs';
import { QuestionsResponse } from '../models/questions-response.model';
import {
  MapResponseToQuestion,
  QuestionResponse,
} from '../models/question-response.model';
import { CreateQuestionRequest } from '../models/create-question-request.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: QuizQuestion[] = [];

  public questionListChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  fetchQuestions(quizId: string): Observable<QuizQuestion[]> {
    return this.http
      .get<QuestionsResponse>(
        environment.backendUrl + 'quizzes/' + quizId + '/questions'
      )
      .pipe(
        map((response) =>
          response.items.map((questionResponse) =>
            MapResponseToQuestion(questionResponse)
          )
        ),
        tap((questions) => {
          this.questions = questions;
        })
      );
  }

  getQuestions() {
    return [...this.questions];
  }

  fetchQuestionById(questionId: string) {
    return this.http
      .get<QuestionResponse>(environment.backendUrl + 'questions/' + questionId)
      .pipe(map((response) => MapResponseToQuestion(response)));
  }

  createQuestion(quizId: string) {
    const request = new CreateQuestionRequest(
      'No Question',
      'Empty Answer 1',
      'Empty Answer 2',
      'Empty Answer 3',
      'Empty Answer 4'
    );

    this.http
      .post<QuestionResponse>(
        environment.backendUrl + 'quizzes/' + quizId + '/questions',
        request
      )
      .pipe(map((response) => MapResponseToQuestion(response)))
      .subscribe((question) => {
        this.questions.push(question);
        this.questionListChanged.next();
      });
  }

  updateQuizQuestion(question: QuizQuestion) {
    return this.http.put(
      environment.backendUrl + `questions/${question.id}.json`,
      question
    );
  }

  deleteQuizQuestion(questionId: string) {
    return this.http
      .delete(environment.backendUrl + `questions/` + questionId)
      .subscribe((response) => {
        const index = this.questions.findIndex((q) => q.id == questionId);

        if (index >= 0) {
          this.questions.splice(index, 1);
          this.questionListChanged.next();
        }
      });
  }
}
