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
  selector: 'app-quiz-editimage-dialog',
  templateUrl: './quiz-editimage-dialog.component.html',
  imports: [MatIconModule, FormsModule, CommonModule],
})
export class QuizEditImageDialogComponent implements OnInit {
  @Output()
  closed = new EventEmitter<{ confirmed: boolean; imageUrl: string }>();

  @ViewChild('dialogWindow', { static: false })
  dialog!: ElementRef;

  @ViewChild('editImageInput', { static: false })
  editImageInput!: ElementRef;

  @ViewChild('editForm', { static: false })
  editForm!: NgForm;

  ngOnInit(): void {}

  openDialog(existingImageUrl: string | undefined) {
    if (existingImageUrl) {
      this.editForm.setValue({ imageUrl: existingImageUrl });
    }

    this.dialog.nativeElement.showModal();
  }

  onConfirmed() {
    this.closed.emit({
      confirmed: true,
      imageUrl: this.editForm.value['imageUrl'],
    });
    this.dialog.nativeElement.close();
  }

  onCancelled() {
    this.closed.emit({ confirmed: false, imageUrl: '' });
    this.dialog.nativeElement.close();
  }
}
