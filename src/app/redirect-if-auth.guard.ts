import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');

  if (token) {
    router.navigate(['/menu']);
    return false;
  }
  return true;
};
