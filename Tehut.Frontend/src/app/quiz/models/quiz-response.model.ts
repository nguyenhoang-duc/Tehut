import { Quiz } from './quiz.model';

export interface QuizResponse {
  guid: string;
  name: string;
}

export function MapResponseToQuiz(quizResponse: QuizResponse) {
  const quiz = new Quiz(quizResponse.name);

  quiz.id = quizResponse.guid;

  return quiz;
}
