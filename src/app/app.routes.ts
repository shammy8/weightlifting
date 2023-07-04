import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { SessionComponent } from './session/session.component';
import { ExerciseHistoryComponent } from './exercise-history/exercise-history.component';
import { MainComponent } from './main/main.component';

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

// TODO wrap all login components into one?
export const routes: Routes = [
  {
    component: MainComponent,
    path: '',
    canActivate: [authGuard],
  },
  {
    path: 'session/:sessionId',
    component: SessionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'exercise-history/:exerciseId',
    component: ExerciseHistoryComponent,
    canActivate: [authGuard],
  },
  {
    component: LoginComponent,
    path: 'login',
    canActivate: [rerouteLoginPageGuard],
  },
];
