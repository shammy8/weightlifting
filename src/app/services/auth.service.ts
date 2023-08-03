import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Admin, Record } from 'pocketbase';

import { PocketBaseInstanceService } from '../pocket-base-instance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _pbService = inject(PocketBaseInstanceService);
  private readonly _router = inject(Router);

  userRecord: WritableSignal<Record | Admin | null> = signal(null);
  isLoggedIn = computed(() => !!this.userRecord());

  constructor() {
    this._pbService.pb.authStore.onChange(
      () => this.userRecord.set(this._pbService.pb.authStore.model),
      true,
    );
  }

  async loginWithGoogle() {
    await this._pbService.pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' });

    this._router.navigate(['']);
  }

  logoff() {
    this._pbService.pb.authStore.clear();
    this._router.navigate(['/login']);
  }
}
