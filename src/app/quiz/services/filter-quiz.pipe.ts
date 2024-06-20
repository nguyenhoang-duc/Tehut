import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../models/quiz.model';

@Pipe({
  name: 'filterquiz',
  standalone: true,
})
export class FilterQuizPipe implements PipeTransform {
  transform(value: Quiz[], filterText: string, ...args: any[]) {
    if (!filterText) {
      return value;
    }

    const unifiedFilterText = filterText.toLowerCase().trim();

    return value.filter(
      (value) =>
        value.name.toLowerCase().trim().indexOf(unifiedFilterText) !== -1
    );
  }
}
