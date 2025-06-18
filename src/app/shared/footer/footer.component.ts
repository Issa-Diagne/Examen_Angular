// footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html', // Fixed filename
  styleUrls: ['./footer.component.css'] // Fixed filename
})
export class FooterComponent { // Changed class name to FooterComponent
  currentYear = new Date().getFullYear();
}