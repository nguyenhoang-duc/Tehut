import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardIconButtonComponent } from './card-icon-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  template: `
    <label
      class="input input-bordered ml-14 mt-6 flex items-center gap-2 rounded-3xl border-base2 bg-base focus-within:outline-secondary-content">
      <input
        type="text"
        class="grow text-primary-content placeholder-secondary-content"
        placeholder="Search"
        [(ngModel)]="searchText"
        (keyup)="onSearch()" />
      <app-card-icon-button
        [iconType]="!searchText ? 'search' : 'clear'"
        tooltip="Clear Search"
        [disabled]="!searchText"
        (click)="onClear()" />
    </label>
  `,
  standalone: true,
  imports: [CommonModule, MatIconModule, CardIconButtonComponent, FormsModule],
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
