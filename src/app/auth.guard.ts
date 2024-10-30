import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const isAuthenticated = checkIfUserIsAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};

function checkIfUserIsAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !!token;
}