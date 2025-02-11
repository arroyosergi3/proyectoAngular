import { inject } from '@angular/core';
import { ApiService } from './../services/api.service';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const apiservice = inject(ApiService);
    const router = inject(Router);

    if (apiservice.isAdmin()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
};
