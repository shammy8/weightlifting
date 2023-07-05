import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <a mat-button>
        <span routerLink="">WL</span>
      </a>

      <button
        *ngIf="authService.isLoggedIn()"
        mat-icon-button
        (click)="logoff()"
      >
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  authService = inject(AuthService);

  logoff() {
    this.authService.logoff();
  }
}
