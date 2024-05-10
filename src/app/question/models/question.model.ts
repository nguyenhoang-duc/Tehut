export class QuizQuestion {
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  correctAnswerIndex = 0;

  constructor(
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    correctAnswerIndex = 0
  ) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}
