import { QuizQuestion } from './question.model';

export interface QuestionResponse {
  questionGuid: string;
  quizGuid: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
}

export function MapResponseToQuestion(response: QuestionResponse) {
  const quizQuestion = new QuizQuestion(
    response.question,
    response.answer1,
    response.answer2,
    response.answer3,
    response.answer4,
    response.correctAnswer
  );

  quizQuestion.id = response.questionGuid;
  quizQuestion.quizid = response.quizGuid;

  return quizQuestion;
}
