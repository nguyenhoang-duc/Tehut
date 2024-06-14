import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import appInfo from '../app-info.json';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [MatIconModule],
})
export class FooterComponent {
  appVersion: string = '';

  constructor() {
    this.appVersion = JSON.parse(JSON.stringify(appInfo)).version;
  }
}
