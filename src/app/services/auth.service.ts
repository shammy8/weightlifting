import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PocketBaseService } from '../pocket-base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pbService = inject(PocketBaseService);
  router = inject(Router);

  isLoggedIn = signal(false);

  constructor() {
    this.pbService.pb.authStore.onChange(() => {
      this.isLoggedIn.set(!!this.pbService.pb.authStore.model);
    }, true);
  }

  async loginWithGoogle() {
    await this.pbService.pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' });

    this.router.navigate(['']);
  }

  logoff() {
    this.pbService.pb.authStore.clear();
    this.router.navigate(['/login']);
  }
}
