import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../models/quiz.model';

@Pipe({
  name: 'filterquiz',
  standalone: true,
})
export class FilterQuizPipe implements PipeTransform {
  transform(quizzes: Quiz[], filterText: string, ...args: any[]) {
    if (!filterText) {
      return quizzes;
    }

    const filter = filterText.toLowerCase().trim();

    return quizzes.filter(
      (quiz) => quiz.name.toLowerCase().trim().indexOf(filter) !== -1
    );
  }
}
