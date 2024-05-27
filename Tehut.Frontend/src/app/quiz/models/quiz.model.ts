import { QuizQuestion } from '../../question/models/question.model';

export class Quiz {
  id: string = '';
  name: string = '';
  imagePath: string = '';
  questionCount: number = 0;
  questions: QuizQuestion[] = [];

  constructor(name: string, imagePath: string = '') {
    this.name = name;
    this.imagePath = imagePath;
  }
}
