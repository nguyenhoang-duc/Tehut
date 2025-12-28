import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-icon-button',
  template: `
    <button
      class="enabled:text-secondary-content hover:enabled:text-primary-content disabled:text-base2-disabled flex items-center hover:enabled:cursor-pointer"
      [disabled]="disabled"
      [attr.data-tip]="tooltip"
      [ngClass]="{ 'tooltip-base': !disabled }"
      #iconButton>
      <mat-icon>{{ iconType }}</mat-icon>
    </button>
  `,
  imports: [CommonModule, MatIconModule],
})
export class CardIconButtonComponent {
  @Input()
  iconType: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  tooltip: string = '';
}
