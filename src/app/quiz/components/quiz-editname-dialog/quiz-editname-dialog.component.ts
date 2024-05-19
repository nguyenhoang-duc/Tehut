import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz-editname-dialog',
  templateUrl: './quiz-editname-dialog.component.html',
  styleUrl: './quiz-editname-dialog.component.css',
})
export class QuizEditnameDialogComponent implements OnInit {
  @Output()
  nameChanged = new EventEmitter<string>();

  @ViewChild('dialogWindow', { static: false })
  dialog!: ElementRef;

  @ViewChild('editNameInput', { static: false })
  editNameInput!: ElementRef;

  @ViewChild('editForm', { static: false })
  editForm!: NgForm;

  ngOnInit(): void {}

  openDialog(existingName: string | undefined) {
    if (existingName) {
      this.editForm.setValue({ name: existingName });
      //this.editNameInput.nativeElement.select();
      console.log(this.editForm);
    }

    this.dialog.nativeElement.showModal();
  }

  onConfirmed() {
    this.nameChanged.emit(this.editForm.value['name']);
    this.dialog.nativeElement.close();
  }

  onCancelled() {
    this.dialog.nativeElement.close();
  }
}
