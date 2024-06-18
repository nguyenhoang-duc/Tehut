import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyInteractionService {
  keyUp = new Subject<KeyboardEvent>();

  onKeyUp(event: KeyboardEvent) {
    this.keyUp.next(event);
  }
}
