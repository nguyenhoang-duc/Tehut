import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuizQuestion } from '../models/question.model';
import { QuizService } from '../../quiz/services/quiz.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public questionListChanged = new Subject<void>();

  constructor(private quizService: QuizService) {}

  getQuestions(quizId: string): QuizQuestion[] {
    const questionIds: string[] = this.getQuestionIds(quizId);

    return questionIds
      .map((id) => this.getQuestionById(id))
      .filter((question) => question !== undefined) as QuizQuestion[];
  }

  getQuestionById(questionId: string) {
    const questionString =
      localStorage.getItem(`questions/${questionId}`) ?? '';

    try {
      const question = JSON.parse(questionString) as QuizQuestion;
      return question;
    } catch {
      return undefined;
    }
  }

  createQuestion(quizId: string) {
    const question = new QuizQuestion(
      'No Question',
      'Empty Answer 1',
      'Empty Answer 2',
      'Empty Answer 3',
      'Empty Answer 4'
    );

    this.createQuestionByTemplate(quizId, question);
  }

  createQuestionByTemplate(quizId: string, questionTemplate: QuizQuestion) {
    questionTemplate.quizid = quizId;
    questionTemplate.id = uuid();

    localStorage.setItem(
      `questions/${questionTemplate.id}`,
      JSON.stringify(questionTemplate)
    );

    const questionIds: string[] = this.getQuestionIds(quizId);

    questionIds.push(questionTemplate.id);
    localStorage.setItem(`quizzes/${quizId}/questions`, questionIds.join(','));

    this.quizService.updateQuestionCount(quizId);
    this.questionListChanged.next();
  }

  updateQuizQuestion(questionId: string, question: QuizQuestion) {
    localStorage.setItem(`questions/${questionId}`, JSON.stringify(question));
  }

  deleteQuizQuestion(question: QuizQuestion) {
    localStorage.removeItem(`questions/${question.id}`);

    const questionIds = this.getQuestionIds(question.quizid);
    const questionIndex = questionIds.indexOf(question.id);

    if (questionIndex >= 0) {
      questionIds.splice(questionIndex, 1);
      localStorage.setItem(
        `quizzes/${question.quizid}/questions`,
        questionIds.join(',')
      );

      this.quizService.updateQuestionCount(question.quizid);
      this.questionListChanged.next();
    }
  }

  private getQuestionIds(quizId: string) {
    const questionIdsString =
      localStorage.getItem(`quizzes/${quizId}/questions`) ?? '';

    return questionIdsString ? questionIdsString.split(',') : [];
  }
}
