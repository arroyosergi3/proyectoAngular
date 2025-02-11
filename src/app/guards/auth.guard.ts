import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiservice = inject(ApiService);
  const router = inject(Router);

  if (apiservice.isAutenticated()) {
    //alert("Es true");
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
