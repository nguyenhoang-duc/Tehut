import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CardIconButtonComponent } from './card-icon-button.component';

@Component({
    selector: 'app-search-bar',
    template: `
    <label
      class="input input-bordered flex h-10 w-full min-w-24 items-center justify-between rounded-3xl border-base2 bg-base focus-within:outline-secondary-content">
      <input
        type="text"
        class="w-full text-sm text-primary-content placeholder-secondary-content lg:text-base lg:text-primary-content"
        placeholder="Search"
        [(ngModel)]="searchText"
        (keyup)="onSearch()" />
      <app-card-icon-button
        [iconType]="!searchText ? 'search' : 'clear'"
        tooltip="Clear Search"
        [disabled]="!searchText"
        data-button-type="clear"
        (click)="onClear()" />
    </label>
  `,
    imports: [CommonModule, MatIconModule, CardIconButtonComponent, FormsModule]
})
export class SearchBarComponent {
  @Output()
  search = new EventEmitter<string>();

  searchText = '';

  onSearch() {
    this.search.emit(this.searchText);
  }

  onClear() {
    this.searchText = '';
    this.search.emit(this.searchText);
  }
}
