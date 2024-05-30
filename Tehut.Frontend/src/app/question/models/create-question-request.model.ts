export class CreateQuestionRequest {
  constructor(
    public question: string,
    public answer1: string,
    public answer2: string,
    public answer3: string,
    public answer4: string,
    public correctAnswer: number = 1
  ) {}
}
