import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizQuestion } from '../../question/models/question.model';

@Pipe({
  name: 'filterquestion',
  standalone: true,
})
export class FilterQuestionPipe implements PipeTransform {
  transform(quizQuestions: QuizQuestion[], filterText: string, ...args: any[]) {
    if (!filterText) {
      return quizQuestions;
    }

    const filter = filterText.toLowerCase().trim();

    return quizQuestions.filter((quizQuestion) => {
      return (
        quizQuestion.question.toLowerCase().trim().indexOf(filter) !== -1 ||
        quizQuestion.answer1.toLowerCase().trim().indexOf(filter) !== -1 ||
        quizQuestion.answer2.toLowerCase().trim().indexOf(filter) !== -1 ||
        quizQuestion.answer3.toLowerCase().trim().indexOf(filter) !== -1 ||
        quizQuestion.answer4.toLowerCase().trim().indexOf(filter) !== -1
      );
    });
  }
}
