import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SessionSelectCalendarComponent } from './session-select-calendar/session-select-calendar.component';
import { AuthService } from './services/auth.service';

const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};

const rerouteLoginPageGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return router.parseUrl('');
  } else {
    return true;
  }
};

export const routes: Routes = [
  {
    component: SessionSelectCalendarComponent,
    path: '',
    canActivate: [authGuard],
  },
  {
    component: LoginComponent,
    path: 'login',
    canActivate: [rerouteLoginPageGuard],
  },
];
