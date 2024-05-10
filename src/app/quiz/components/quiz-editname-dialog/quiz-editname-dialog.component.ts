import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quiz-editname-dialog',
  templateUrl: './quiz-editname-dialog.component.html',
  styleUrl: './quiz-editname-dialog.component.css',
})
export class QuizEditnameDialogComponent {
  @Output()
  nameChanged = new EventEmitter<string>();

  @ViewChild('dialogWindow', { static: false })
  dialog!: ElementRef;

  @ViewChild('editNameInput', { static: false })
  editNameInput!: ElementRef;

  openDialog(existingName: string | undefined) {
    if (existingName) {
      this.editNameInput.nativeElement.value = existingName;
      this.editNameInput.nativeElement.select();
    }

    this.dialog.nativeElement.showModal();
  }

  onConfirmed() {
    this.nameChanged.emit(this.editNameInput.nativeElement.value);
    this.dialog.nativeElement.close();
  }

  onCancelled() {
    this.dialog.nativeElement.close();
  }
}
