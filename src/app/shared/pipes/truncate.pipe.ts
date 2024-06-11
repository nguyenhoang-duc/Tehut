import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number,
    showDots: boolean = true,
    ...args: any[]
  ) {
    if (value.length <= maxLength) {
      return value;
    }

    return showDots
      ? value.substring(0, maxLength) + '...'
      : value.substring(0, maxLength);
  }
}
