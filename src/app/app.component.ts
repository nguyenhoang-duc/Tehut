import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { KeyInteractionService } from './shared/services/key-interaction.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, FooterComponent, RouterModule],
})
export class AppComponent {
  title = 'Tehut';

  constructor(private keyInteractionService: KeyInteractionService) {}

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.keyInteractionService.onKeyUp(event);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.keyInteractionService.onKeyDown(event);
  }
}
