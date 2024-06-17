import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyInteractionService {
  keyUp = new Subject<string>();

  onKeyUp(event: KeyboardEvent) {
    this.keyUp.next(event.key);
  }
}
