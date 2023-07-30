import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Admin, Record } from 'pocketbase';

import { PocketBaseService } from '../pocket-base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pbService = inject(PocketBaseService);
  router = inject(Router);

  userRecord: WritableSignal<Record | Admin | null> = signal(null);
  isLoggedIn = computed(() => !!this.userRecord());

  constructor() {
    this.pbService.pb.authStore.onChange(
      () => this.userRecord.set(this.pbService.pb.authStore.model),
      true,
    );
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
