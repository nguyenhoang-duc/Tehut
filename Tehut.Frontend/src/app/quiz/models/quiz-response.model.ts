import { Quiz } from './quiz.model';

export interface QuizResponse {
  guid: string;
  name: string;
  questionCount: number;
}

export function MapResponseToQuiz(quizResponse: QuizResponse) {
  const quiz = new Quiz(quizResponse.name);

  quiz.id = quizResponse.guid;
  quiz.questionCount = quizResponse.questionCount;

  return quiz;
}
