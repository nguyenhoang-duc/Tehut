import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from '../../quiz/models/quiz.model';

export class QuizRunSession {
  public currentQuestionIndex = 0;
  public selectedAnswers: number[];

  public stopTimeString: string = '';

  constructor(
    public quiz: Quiz,
    public questions: QuizQuestion[],
    public startTimeString: string
  ) {
    this.selectedAnswers = new Array<number>(quiz.questionCount).fill(-1);
  }
}
