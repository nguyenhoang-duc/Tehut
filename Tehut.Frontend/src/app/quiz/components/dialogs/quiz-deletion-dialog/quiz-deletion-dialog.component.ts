import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-quiz-deletion-dialog',
  templateUrl: './quiz-deletion-dialog.component.html',
})
export class QuizDeletionDialogComponent {
  @Output()
  closed = new EventEmitter<boolean>();

  @ViewChild('dialogWindow', { static: false })
  dialog!: ElementRef;

  private confirmButtonPressed = false;

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  onConfirmed() {
    this.confirmButtonPressed = true;
    this.dialog.nativeElement.close();
  }

  onCancelled() {
    this.dialog.nativeElement.close();
  }

  onClosed() {
    this.closed.emit(this.confirmButtonPressed);
    this.confirmButtonPressed = false;
  }
}
