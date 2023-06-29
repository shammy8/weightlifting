import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>WL</span>

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
