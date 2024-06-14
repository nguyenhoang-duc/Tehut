import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-icon-button',
  template: `
    <button
      class="enabled:tooltip-base enabled:text-secondary-content hover:enabled:cursor-pointer hover:enabled:text-primary-content disabled:text-base2"
      [disabled]="disabled"
      [attr.data-tip]="tooltip">
      <mat-icon class="min-h-9 min-w-9 text-4xl">{{ iconType }}</mat-icon>
    </button>
  `,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class HeaderIconButtonComponent {
  @Input()
  iconType: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  tooltip: string = '';
}
