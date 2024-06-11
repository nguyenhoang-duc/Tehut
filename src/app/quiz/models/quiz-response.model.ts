import { Quiz } from './quiz.model';

export interface QuizResponse {
  guid: string;
  name: string;
  imageUrl: string;
  questionCount: number;
}

export function MapResponseToQuiz(quizResponse: QuizResponse) {
  const quiz = new Quiz(quizResponse.name);

  quiz.id = quizResponse.guid;
  quiz.questionCount = quizResponse.questionCount;
  quiz.imagePath = quizResponse.imageUrl;

  return quiz;
}
