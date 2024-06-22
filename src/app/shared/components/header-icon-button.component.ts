import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-icon-button',
  template: `
    <button
      class="flex items-center enabled:text-secondary-content hover:enabled:cursor-pointer hover:enabled:text-primary-content disabled:text-base2"
      [disabled]="disabled"
      [attr.data-tip]="tooltip"
      [ngClass]="{ 'tooltip-base': !disabled }">
      <mat-icon class="scale-125 md:scale-150">
        {{ iconType }}
      </mat-icon>
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
