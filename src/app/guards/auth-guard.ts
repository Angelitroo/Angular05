import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import {authState} from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser = await firstValueFrom(authState(authService.auth));

  //Comprobamos si hay sesion mirando el token
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  //Cojemos el usuario de firebase
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  //Unavez tenemos el objeto usuario leemos su rol y comprobamos con lo indicado en app.routes.ts
  try {
    const userData = await firstValueFrom(authService.getUserById(currentUser.uid));
    const allowedRoles: string[] = route.data['roles'] || ['user', 'admin'];

    if (!allowedRoles.includes(userData.role)) {
      alert('No tienes permiso para acceder a esta página.');
      router.navigate(['/home']);
      return false;
    }
    console.log('Usuario actual (guard):', userData);
    return true;
  } catch (err) {
    console.error('Error obteniendo usuario:', err);
    router.navigate(['/login']);
    return false;
  }
};
