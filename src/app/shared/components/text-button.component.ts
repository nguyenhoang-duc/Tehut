import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-button',
  template: `
    <button
      class="rounded-lg px-7 py-3 text-sm tracking-wide enabled:text-primary-content enabled:hover:outline-none enabled:hover:outline-secondary-content disabled:bg-base3 disabled:text-secondary-content"
      [ngClass]="bg"
      [disabled]="disabled"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class TextButtonComponent {
  @Input()
  bg: string = '';

  @Input()
  disabled = false;

  @Input()
  type = 'button';
}
