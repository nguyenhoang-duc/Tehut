import { QuizQuestion } from './question.model';

export class UpdateQuestionRequest {
  constructor(
    public question: string,
    public answer1: string,
    public answer2: string,
    public answer3: string,
    public answer4: string,
    public correctAnswer: number = 1
  ) {}
}

export function MapQuestionToUpdateRequest(question: QuizQuestion) {
  return new UpdateQuestionRequest(
    question.question,
    question.answer1,
    question.answer2,
    question.answer3,
    question.answer4,
    question.correctAnswerIndex
  );
}
