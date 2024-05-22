import { QuizQuestion } from '../../question/models/question.model';

export class Quiz {
  name: string = '';
  imagePath: string = '';
  questions: QuizQuestion[] = [];

  constructor(name: string, questions: QuizQuestion[], imagePath: string = '') {
    this.name = name;
    this.questions = questions;
    this.imagePath = imagePath;
  }
}
