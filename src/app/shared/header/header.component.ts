// header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // Add RouterModule for routerLink
  templateUrl: './header.component.html', // Fixed filename
  styleUrls: ['./header.component.css'] // Fixed filename
})
export class HeaderComponent { // Changed class name to HeaderComponent
  
}