import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-button (click)="loginWithGoogle()">Login</button> `,
})
export class LoginComponent {
  authService = inject(AuthService);

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
