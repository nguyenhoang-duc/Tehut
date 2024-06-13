import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-icon-button',
  template: `
    <button
      class="enabled:tooltip-base enabled:text-secondary-content hover:enabled:cursor-pointer hover:enabled:text-primary-content disabled:text-base2_disabled"
      (click)="click.emit($event)"
      [disabled]="disabled"
      [attr.data-tip]="tooltip"
      #iconButton>
      <mat-icon>{{ iconType }}</mat-icon>
    </button>
  `,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class CardIconButtonComponent {
  @Input()
  iconType: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  tooltip: string = '';

  @Output()
  click = new EventEmitter<MouseEvent>();
}
