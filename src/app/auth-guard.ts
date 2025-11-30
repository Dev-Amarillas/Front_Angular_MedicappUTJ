import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const user = localStorage.getItem('user');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
