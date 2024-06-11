import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuizRequest } from '../models/quiz-request.model';
import { MapResponseToQuiz, QuizResponse } from '../models/quiz-response.model';
import { Quiz } from '../models/quiz.model';
import { QuizzesResponse } from '../models/quizzes-response.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizListChanged = new Subject<void>();

  private quizzes: Quiz[] = [];

  constructor(private http: HttpClient) {}

  fetchQuizzes(): Observable<Quiz[]> {
    return this.http
      .get<QuizzesResponse>(environment.backendUrl + 'quizzes')
      .pipe(
        map((response) => {
          return response.items.map((quizResponse) =>
            MapResponseToQuiz(quizResponse)
          );
        }),
        tap((response) => (this.quizzes = response))
      );
  }

  getQuizzes() {
    return [...this.quizzes];
  }

  getQuizById(quizId: string) {
    return this.http
      .get<QuizResponse>(environment.backendUrl + 'quizzes/' + quizId)
      .pipe(map((response) => MapResponseToQuiz(response)));
  }

  createQuiz() {
    const request = new QuizRequest('No Title', '');

    this.http
      .post<QuizResponse>(environment.backendUrl + 'quizzes', request)
      .subscribe((response) => {
        this.quizzes.push(MapResponseToQuiz(response));
        this.quizListChanged.next();
      });
  }

  updateQuizName(quiz: Quiz, newName: string) {
    const request = new QuizRequest(newName, quiz.imagePath);

    return this.http.put<QuizResponse>(
      environment.backendUrl + 'quizzes/' + quiz.id,
      request
    );
  }

  updateQuizImageUrl(quiz: Quiz, newImageUrl: string) {
    const request = new QuizRequest(quiz.name, newImageUrl);

    return this.http.put<QuizResponse>(
      environment.backendUrl + 'quizzes/' + quiz.id,
      request
    );
  }

  deleteQuiz(quizId: string) {
    this.http
      .delete(environment.backendUrl + `quizzes/${quizId}`)
      .subscribe((_) => {
        const index = this.quizzes.findIndex((q) => q.id == quizId);

        if (index > 0) {
          this.quizzes.splice(index, 1);
          this.quizListChanged.next();
        }
      });
  }
}
