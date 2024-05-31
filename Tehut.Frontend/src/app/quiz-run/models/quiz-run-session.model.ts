import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from '../../quiz/models/quiz.model';

export class QuizRunSession {
  public currentQuestionIndex = 0;

  constructor(
    public quiz: Quiz,
    public questions: QuizQuestion[],
    public startTime: Date
  ) {}
}
