import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-quiz-editname-dialog',
  templateUrl: './quiz-editname-dialog.component.html',
  imports: [MatIconModule, FormsModule, CommonModule],
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
